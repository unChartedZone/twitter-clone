import type { UserSummary } from "./User";

export interface Message {
  id: string;
  body: string;
  createdAt: Date;
  user: UserSummary;
}
