import type { TweetResponse } from "@/types/ResponseTypes";
import { authClient } from "../client";
import { transformTweetResponse } from "../helpers";
import type Tweet from "@/models/Tweet";

export async function likeTweet(tweetId: string): Promise<Tweet> {
  const res = await authClient.post<TweetResponse>(`/tweets/${tweetId}/like`);
  return transformTweetResponse(res.data);
}

export async function unlikeTweet(tweetId: string): Promise<void> {
  try {
    await authClient.post(`/tweets/${tweetId}/unlike`);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject("Failed to unlike tweet");
  }
}
