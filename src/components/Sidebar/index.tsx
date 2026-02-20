import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import ConversationList from "./ConversationList";
import { conversationRepository } from "../../modules/conversations/conversation.repository";
import { conversationsAtom } from "../../modules/conversations/conversation.state";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const setConversations = useSetAtom(conversationsAtom);

  const createConversation = async () => {
    try {
      const conversation = await conversationRepository.create();
      console.log(conversation);
      setConversations((prev) => [conversation, ...prev]);
      navigate(`/chats/${conversation.id}`);
    } catch (error) {
      console.error(error);
      alert("会話の作成に失敗しました");
    }
  };
  return (
    <div className="sidebar">
      <div style={{ padding: "16px" }}>
        <button
          className="btn-primary"
          style={{ width: "100%" }}
          onClick={createConversation}
        >
          + 新規チャット
        </button>
      </div>
      <ConversationList />

      <div
        style={{
          padding: "16px",
          marginTop: "auto",
          borderTop: "1px solid #E5E5E5",
        }}
      >
        <button
          className="sidebar-item"
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            margin: 0,
          }}
          onClick={() => {}}
        >
          <HiOutlineArrowRightOnRectangle size={20} />
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  );
}
