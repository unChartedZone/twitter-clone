import type { TweetResponse } from "@/types/ResponseTypes";
import { authClient } from "../client";
import type Tweet from "@/models/Tweet";

export async function likeTweet(tweetId: string): Promise<Tweet> {
  const res = await authClient.post<TweetResponse>(`/tweets/${tweetId}/like`);
  return res.data.tweet;
}

export async function unlikeTweet(tweetId: string): Promise<void> {
  try {
    await authClient.post(`/tweets/${tweetId}/unlike`);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject("Failed to unlike tweet");
  }
}
