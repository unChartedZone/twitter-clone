import type { User, UserSummary } from "@/models/User";
import { authClient } from "../client";
import type { ResponseList } from "@/types/ResponseTypes";

async function fetchUserSummaries(): Promise<User[]> {
  const res = await authClient.get<{ users: User[] }>("/users/summary");
  return res.data.users;
}

export { fetchUserSummaries };
