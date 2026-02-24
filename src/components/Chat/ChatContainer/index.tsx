import MessageList from "../MessageList";
import { HiOutlinePaperAirplane, HiOutlinePhoto } from "react-icons/hi2";
import "./index.css";
import { useState } from "react";
import { model } from "../../../lib/gemini";
import { useParams } from "react-router-dom";
import { messageRepository } from "../../../modules/messages/message.repository";

export default function ChatContainer() {
  const [inputText, setInputText] = useState("");
  const { conversationId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    const currentMessage = inputText.trim();

    setIsLoading(true);

    try {
      await createUserMessage(currentMessage);
      setInputText("");
      await createAiMessage(currentMessage);
    } catch (error) {
      console.error(error);
      alert("メッセージの送信に失敗しました");
    } finally {
      setIsLoading(false);
    }

    const result = await model.generateContent(currentMessage);
    console.log(result.response.text());
  };

  const createUserMessage = async (content: string) => {
    const userMessage = await messageRepository.create(conversationId!, {
      role: "user",
      content,
    });
    console.log(userMessage);
  };

  const createAiMessage = async (content: string) => {
    const result = await model.generateContent(content);

    const aiMessage = await messageRepository.create(conversationId!, {
      role: "assistant",
      content: result.response.text(),
    });
    console.log(aiMessage);
  };

  return (
    <div className="chat-container">
      <MessageList />

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
