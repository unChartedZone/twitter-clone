import { authClient, client } from "./client";
import type User from "@/models/User";
import type Tweet from "@/models/Tweet";
import { type BaseTweet } from "@/models/Tweet";
import type { BaseUser, UserPatch } from "@/models/User";
import type {
  LoginResponse,
  UserResponse,
  TweetResponse,
} from "@/types/ResponseTypes";
import type { LoginPayload } from "@/types/RequestPayloads";

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
  const res = await authClient.get<TweetResponse>("/tweets/feed");
  return transformTweetResponse(res.data);
}

export async function fetchUserTweets(): Promise<Tweet[]> {
  const res = (await authClient.get<TweetResponse>("/tweets")).data;
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
  username: string
): Promise<Tweet[] | undefined> {
  const res = (
    await authClient.get<TweetResponse>(`/tweets/profile/${username}/protected`)
  ).data;
  return transformTweetResponse(res);
}

// TODO: allow tweets of profile to be viewed in the future
export async function fetchProfileTweets(
  username: string
): Promise<Tweet[] | undefined> {
  try {
    const res = (await client.get<TweetResponse>(`/tweets/profile/${username}`))
      .data;
    return transformTweetResponse(res);
  } catch (e) {
    console.error(e);
  }
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
    value && formData.append(`user[${key}]`, value);
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

// TODO: maybe move this to profile store?
function transformTweetResponse(res: TweetResponse): Tweet[] {
  const userMap: Map<string, BaseUser> = res.included.reduce((acc, value) => {
    acc.set(value.id, {
      ...value.attributes,
      id: value.id,
    });
    return acc;
  }, new Map<string, BaseUser>());

  return res.data.map((tweet) => ({
    ...tweet.attributes,
    id: tweet.id,
    user: userMap.get(tweet.relationships?.user.data.id ?? ""),
  }));
}
