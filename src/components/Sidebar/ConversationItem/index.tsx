import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import "./index.css";
import type { Conversation } from "../../../modules/conversations/conversation.entity";
import { useSetAtom } from "jotai";
import { conversationsAtom } from "../../../modules/conversations/conversation.state";
import { conversationRepository } from "../../../modules/conversations/conversation.repository";

interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  const { conversationId } = useParams();
  const setConversations = useSetAtom(conversationsAtom);
  const isActive = conversationId === conversation.id;
  const navigate = useNavigate();

  const deleteConversations = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!window.confirm("この会話を削除しますか？")) return;

    try {
      await conversationRepository.delete(conversation.id);
      setConversations((prev) =>
        prev.filter((item) => item.id !== conversation.id),
      );
      if (isActive) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("会話の削除に失敗しました");
    }
  };
  return (
    <Link
      to={`/chats/${conversation.id}`}
      className={`conversation-item ${isActive ? "active" : ""}`}
    >
      <div className="conversation-title">
        {conversation.title || "新しい会話"}
      </div>
      <button
        className="btn-icon delete-btn"
        onClick={deleteConversations}
        title="削除"
        type="button"
      >
        <HiOutlineTrash />
      </button>
    </Link>
  );
}
