import type { UserSummary } from "@/models/User";
import { authClient } from "../client";
import type { ResponseList } from "@/types/ResponseTypes";

async function fetchUserSummaries(): Promise<UserSummary[]> {
  const res = await authClient.get<ResponseList<UserSummary>>("/users/summary");
  return res.data.data.map((u) => u.attributes);
}

export { fetchUserSummaries };
