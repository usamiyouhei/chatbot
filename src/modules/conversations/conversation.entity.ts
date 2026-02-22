import { Message } from "../messages/message.entity";

export class Conversation {
  id!: string;
  userId!: string;
  title?: string;
  createdAt!: Date;
  updatedAt!: Date;
  messages!: Message[];

  constructor(data: Conversation) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.messages = data.messages.map((message) => new Message(message));
  }
}
