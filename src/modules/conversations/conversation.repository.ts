import api from "../../lib/api";
import { Conversation } from "./conversation.entity";

export const conversationRepository = {
  async create(): Promise<Conversation> {
    const { data } = await api.post("/conversations");
    return new Conversation(data);
  },
  async findAll(): Promise<Conversation[]> {
    const { data } = await api.get("conversations");
    return data.map((item: Conversation) => new Conversation(item));
  },
};
