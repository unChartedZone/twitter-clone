import type { UserSummary } from "./User";

export default interface Notification {
  id: string;
  text: string;
  createdAt: string;
  initiator: UserSummary;
}
