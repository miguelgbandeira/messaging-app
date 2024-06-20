import { User } from "./user";

export interface Message {
  _id: string;
  chatId: string;
  message: string;
  sentFrom: string;
  sentTo: User;
  timestamp: string;
}
