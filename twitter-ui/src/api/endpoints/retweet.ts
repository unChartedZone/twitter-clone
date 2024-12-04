import { authClient } from "../client";

export async function retweet(tweetId: string): Promise<void> {
  await authClient.post(`/tweets/${tweetId}/retweet`);
}

export async function unretweet(tweetId: string): Promise<void> {
  await authClient.post(`/tweets/${tweetId}/unretweet`);
}
