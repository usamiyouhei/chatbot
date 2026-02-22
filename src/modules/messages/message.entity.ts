export type MessageRole = "user" | "assistant";

export class Message {
  id!: string;
  conversationId!: string;
  role!: MessageRole;
  content!: string;
  imageUrl?: string;
  createdAt!: Date;

  constructor(data: Message) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
  }
}
