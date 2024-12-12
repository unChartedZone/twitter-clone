import type { CommentListResponse } from "@/types/ResponseTypes";
import { authClient } from "../client";
import type Comment from "@/models/Comment";

export async function fetchComents(tweetId: string): Promise<Comment[]> {
  const res = await authClient.get<CommentListResponse>(
    `/comments?tweet_id=${tweetId}`
  );
  return res.data.data.map((x) => x.attributes);
}

