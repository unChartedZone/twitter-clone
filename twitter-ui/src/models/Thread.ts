import type { UserSummary } from "./User";

export default interface Thread {
  id: string;
  users: UserSummary[];
}
