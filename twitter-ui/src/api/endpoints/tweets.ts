import { authClient, client } from "../client";
import type Tweet from "@/models/Tweet";
import type {
  TweetListResponse,
  TweetResponse,
  Pagination,
} from "@/types/ResponseTypes";
import type { TweetListSegment } from "@/types/TweetList";

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
    tweets: res.data.map((t) => t.attributes),
    links: res.links,
  };
}

/**
 * Fetches tweets from a protected profile for a given username and page number.
 *
 * @param username - The username of the profile whose tweets are to be fetched.
 * @param page - The page number for pagination (default is 1).
 * @returns A promise that resolves to an object containing:
 *          - `tweets`: An array of `Tweet` objects.
 *          - `links`: Pagination information.
 *
 * @throws Will throw an error if the request fails.
 */
export async function fetchTweets(
  username: string,
  page: number = 1,
  segment: TweetListSegment
): Promise<{ tweets: Tweet[]; links: Pagination }> {
  const url = `/tweets/profile/${username}/${
    segment === "default" ? "" : segment
  }`;

  const res = (
    await authClient.get<TweetListResponse>(url, {
      params: { page },
    })
  ).data;
  return {
    tweets: res.data.map((t) => t.attributes),
    links: res.links,
  };
}

export async function fetchFeed(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/tweets/feed");
  return res.data.data.map((t) => t.attributes);
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

export async function fetchProfileTweets(
  username: string
): Promise<Tweet[] | undefined> {
  try {
    const res = (
      await client.get<TweetListResponse>(`/tweets/profile/${username}`)
    ).data;
    return res.data.map((t) => t.attributes);
  } catch (e) {
    console.error(e);
  }
}

export async function exploreUserTweets(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/tweets/explore");
  return res.data.data.map((t) => t.attributes);
}

// TODO: add typings to tweetPayload
export async function postTweet(tweetPayload: any) {
  const res = await authClient.post<TweetResponse>("/tweets", tweetPayload);
  return res.data.data.attributes;
}

export async function appendTweetMedia(
  payload: { image: File; description?: string },
  tweetId?: string
): Promise<Tweet> {
  const formData = new FormData();
  formData.append("image", payload.image);
  payload.description && formData.append("description", payload.description);

  const res = await authClient.post<TweetResponse>("/media", formData, {
    params: { tweetId },
  });
  return res.data.data.attributes;
}

export async function fetchSingleTweet(tweetId: string): Promise<Tweet> {
  const res = await authClient.get<TweetResponse>(`/tweets/${tweetId}`);
  return res.data.data.attributes;
}
