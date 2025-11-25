import type { User, UserSummary } from "@/models/User";
import { authClient } from "../client";
import type { ResponseList } from "@/types/ResponseTypes";

async function fetchUserSummaries(): Promise<UserSummary[]> {
  const res = await authClient.get<{ users: UserSummary[] }>("/users/summary");
  return res.data.users;
}

export { fetchUserSummaries };
