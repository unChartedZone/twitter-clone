import { authClient } from "../client";
import type { TweetListResponse } from "@/types/ResponseTypes";
import type Tweet from "@/models/Tweet";

export async function bookmarkTweet(tweetId: string) {
  const res = await authClient.post<{ message: string }>(
    `/bookmarks?tweet_id=${tweetId}`
  );
  return res.data;
}

export async function fetchBookmarkedTweets(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/bookmarks");
  return res.data.tweets;
}

export async function removeBookmarkedTweet(tweetId: string) {
  const res = await authClient.delete<{ message: string }>(
    `/bookmarks/${tweetId}`
  );
  return res.data;
}
