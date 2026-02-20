import { useAtom } from "jotai";
import ConversationItem from "../ConversationItem";
import "./index.css";
import { conversationsAtom } from "../../../modules/conversations/conversation.state";
import { conversationRepository } from "../../../modules/conversations/conversation.repository";
import { useEffect } from "react";

export default function ConversationList() {
  const [conversations, setConversations] = useAtom(conversationsAtom);

  const fetchConversations = async () => {
    try {
      const data = await conversationRepository.findAll();
      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="conversation-list">
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
    </div>
  );
}
