import type { Message } from "../../../modules/messages/message.entity";
import "./index.css";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
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
    </div>
  );
}
