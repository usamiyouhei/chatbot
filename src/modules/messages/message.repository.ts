import api from "../../lib/api";
import { Message, type MessageRole } from "./message.entity";

interface CreateParams {
  role: MessageRole;
  content: string;
  imageUrl?: string;
}

export const messageRepository = {
  async create(conversationId: string, params: CreateParams): Promise<Message> {
    const { data } = await api.post(
      `/conversations/${conversationId}/messages`,
      params,
    );
    return new Message(data);
  },
};
