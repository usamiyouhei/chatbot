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
  async findOne(id: string): Promise<Conversation> {
    const { data } = await api.get(`/conversations/${id}`);
    return new Conversation(data);
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/conversations/${id}`);
  },
};
