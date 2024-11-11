import { authClient, client } from "./client";
import type User from "@/models/User";
import type Tweet from "@/models/Tweet";
import { type BaseTweet } from "@/models/Tweet";
import type { BaseUser, UserPatch } from "@/models/User";
import type {
  LoginResponse,
  UserResponse,
  TweetListResponse,
  ExploreUsersResponse,
  TweetResponse,
  Pagination,
} from "@/types/ResponseTypes";
import type { LoginPayload } from "@/types/RequestPayloads";
import { transformTweetResponse, transformTweetListResponse } from "./helpers";

export async function login(user: LoginPayload): Promise<LoginResponse> {
  return (await client.post<LoginResponse>("/login", { user })).data;
}

export async function signupUser(payload: {
  username: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}) {
  const res = await client.post<LoginResponse>("/signup", { user: payload });
  return res.data;
}

export async function refresh(): Promise<LoginResponse | undefined> {
  try {
    return (await client.post("/refresh")).data;
  } catch (e) {
    console.log("Failed to refresh user session");
  }
}

export async function logout() {
  return client.post("/logout");
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

export async function postTweet(tweetPayload: any) {
  const res = await authClient.post<TweetResponse>("/tweets", tweetPayload);
  return transformTweetResponse(res.data);
}

export async function patchUser(
  userId: string,
  userPatch: UserPatch,
  bannerImage?: File,
  profileImage?: File
): Promise<BaseUser> {
  const formData = new FormData();

  // Add images to form data if they exist
  !!bannerImage && formData.append("user[banner_image]", bannerImage);
  !!profileImage && formData.append("user[profile_image]", profileImage);

  // Add and text fields from user patch
  Object.keys(userPatch).forEach((key) => {
    const value = userPatch[key as keyof UserPatch];
    value &&
      formData.append(
        `user[${key}]`,
        value instanceof Date ? value.toString() : value
      );
  });

  // Dont make a request if no data was modified
  if (
    Array.from(formData.entries()).length == 0 &&
    !bannerImage &&
    !profileImage
  )
    return Promise.reject("Empty update user payload");

  const res = await authClient.patch<UserResponse>(
    `/users/${userId}`,
    formData
  );
  return res.data.data.attributes;
}

export async function exploreUsers(): Promise<BaseUser[]> {
  const res = await authClient.get<ExploreUsersResponse>("/users/explore");
  return res.data.data.map((x) => x.attributes);
}

export async function exploreUserTweets(): Promise<Tweet[]> {
  const res = await authClient.get<TweetListResponse>("/tweets/explore");
  return transformTweetListResponse(res.data);
}

export async function followUser(userId: string) {
  // TODO: update this when I create a serializer for followers
  const res = await authClient.post<{ followed_user: BaseUser }>(
    `/users/follow/${userId}`
  );
  return res.data;
}
