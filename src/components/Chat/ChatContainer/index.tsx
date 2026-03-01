import MessageList from "../MessageList";
import { HiOutlinePaperAirplane, HiOutlinePhoto } from "react-icons/hi2";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import {
  generateConversationTitle,
  startChatSesson,
} from "../../../lib/gemini";
import { useParams } from "react-router-dom";
import { messageRepository } from "../../../modules/messages/message.repository";
import type { Message } from "../../../modules/messages/message.entity";
import { conversationRepository } from "../../../modules/conversations/conversation.repository";
import type { ChatSession } from "@google/generative-ai";
import { useSetAtom } from "jotai";
import { conversationsAtom } from "../../../modules/conversations/conversation.state";

export default function ChatContainer() {
  const [inputText, setInputText] = useState("");
  const { conversationId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const chatSessionRef = useRef<ChatSession | null>(null);
  const setConversations = useSetAtom(conversationsAtom);

  useEffect(() => {
    fetchMessages(conversationId!);
  }, [conversationId]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const conversation = await conversationRepository.findOne(conversationId);
      setMessages(conversation.messages || []);
      initializeChatSession(conversation.messages || []);
    } catch (error) {
      console.error(error);
    }
  };

  const initializeChatSession = (messages: Message[]) => {
    const history = messages.map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    }));
    chatSessionRef.current = startChatSesson(history);
  };

  const handleSend = async () => {
    const currentMessage = inputText.trim();
    setIsLoading(true);
    const isFirstMessage = messages.length === 0;

    try {
      await createUserMessage(currentMessage);
      setInputText("");
      await createAiMessage(currentMessage);
      if (isFirstMessage) {
        generateAndSaveTitle(currentMessage);
      }
    } catch (error) {
      console.error(error);
      alert("メッセージの送信に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAndSaveTitle = async (message: string) => {
    const title = await generateConversationTitle(message);
    const updatedConversation = await conversationRepository.updateTitle(
      conversationId!,
      title,
    );
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id
          ? updatedConversation
          : conversation,
      ),
    );
  };

  const createUserMessage = async (content: string) => {
    const userMessage = await messageRepository.create(conversationId!, {
      role: "user",
      content,
    });
    setMessages((prev) => [...prev, userMessage]);
    console.log(userMessage);
  };

  const createAiMessage = async (content: string) => {
    if (!chatSessionRef.current) return;
    const result = await chatSessionRef.current.sendMessageStream(content);

    let fullText = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      setStreamingText(fullText);
    }

    const aiMessage = await messageRepository.create(conversationId!, {
      role: "assistant",
      content: fullText,
      // content: result.response.text(),
    });
    setMessages((prev) => [...prev, aiMessage]);
    setStreamingText("");
    console.log(aiMessage);
  };

  return (
    <div className="chat-container">
      <MessageList
        messages={messages}
        isStreaming={isLoading}
        streamingText={streamingText}
      />

      {/* Integrated Message Input Area */}
      <div className="message-input-container">
        {/* Preview Area - Commented out or toggleable */}
        {/* <div className="image-preview-container">
            <div className="image-preview-wrapper">
              <img src="" alt="preview" className="image-preview" />
              <button className="image-preview-close" onClick={() => {}}>
                ×
              </button>
            </div>
          </div> */}

        <div className="message-input-wrapper">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={() => {}}
          />
          <button
            className="icon-button"
            onClick={() => {}}
            title="画像をアップロード"
          >
            <HiOutlinePhoto size={24} />
          </button>
          <textarea
            className="message-input"
            placeholder="AIにメッセージを送信する..."
            rows={1}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
          >
            <HiOutlinePaperAirplane size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
