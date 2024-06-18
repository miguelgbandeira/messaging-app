import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  _id: string;
  users: User[];
  last_message: Message;
}
