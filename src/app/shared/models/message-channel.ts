import {User} from "./user";
import {Message} from "./message";

export interface MessageChannel {
  _id: string;
  users: User[];
  messages: Message[];
  lastSentDate: Date;
}
