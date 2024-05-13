import { User } from "./user";

export interface Prompt {
  prompt: string;
  tag: string;
  creator: User;
  _id: string;
}
