import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import "./index.css";
import type { Conversation } from "../../../modules/conversations/conversation.entity";

interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  return (
    <Link to={`/chats/${conversation.id}`} className="conversation-item">
      <div className="conversation-title">
        {conversation.title || "新しい会話"}
      </div>
      <button
        className="btn-icon delete-btn"
        onClick={() => {}}
        title="削除"
        type="button"
      >
        <HiOutlineTrash />
      </button>
    </Link>
  );
}
