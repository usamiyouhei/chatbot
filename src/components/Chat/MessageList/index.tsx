import { useEffect, useRef } from "react";
import type { Message } from "../../../modules/messages/message.entity";
import "./index.css";
import TypingIndicator from "../TypingIndicator";

interface MessageListProps {
  messages: Message[];
  streamingText: string;
  isStreaming: boolean;
}

export default function MessageList({
  messages,
  streamingText,
  isStreaming,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <div
            key={message.id}
            className={`message-item ${isUser ? "message-item-user" : "message-item-ai"}`}
          >
            <div
              className={`message-content-stack ${isUser ? "stack-user" : "stack-ai"}`}
            >
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="upload image"
                  className="message-image"
                />
              )}
              {message.content && (
                <div
                  className={`message-bubble ${isUser ? "message-user" : "message-ai"}`}
                >
                  {message.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {(isStreaming || streamingText) && (
        <div className="message-item message-item-ai">
          <div className="message-bubble message-ai">
            {streamingText}
            {isStreaming && !streamingText && <TypingIndicator />}
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
