import { authClient, client } from "../client";
import type Tweet from "@/models/Tweet";
import { transformTweetResponse, transformTweetListResponse } from "../helpers";
import type {
  TweetListResponse,
  TweetResponse,
  Pagination,
} from "@/types/ResponseTypes";

export async function fetchProtectedProfileTweets(
  username: string,
  page: number = 1
): Promise<{ tweets: Tweet[]; links: Pagination }> {
  const res = (
    await authClient.get<TweetListResponse>(
      `/tweets/profile/${username}/protected`,
      { params: { page } }
    )
  ).data;
  return {
    tweets: transformTweetListResponse(res),
    links: res.links,
  };
}

export async function fetchFeed(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/tweets/feed");
  return transformTweetListResponse(res.data);
}

export async function fetchUserTweets(): Promise<Tweet[]> {
  const res = (await authClient.get<TweetListResponse>("/tweets")).data;
  return res.data.map(
    (i) =>
      ({
        id: i.id,
        text: i.attributes.text,
        medium: i.attributes.medium,
      } as Tweet)
  );
}

// TODO: allow tweets of profile to be viewed in the future
export async function fetchProfileTweets(
  username: string
): Promise<Tweet[] | undefined> {
  try {
    const res = (
      await client.get<TweetListResponse>(`/tweets/profile/${username}`)
    ).data;
    return transformTweetListResponse(res);
  } catch (e) {
    console.error(e);
  }
}

export async function exploreUserTweets(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/tweets/explore");
  return transformTweetListResponse(res.data);
}

export async function postTweet(tweetPayload: any) {
  const res = await authClient.post<TweetResponse>("/tweets", tweetPayload);
  return transformTweetResponse(res.data);
}
