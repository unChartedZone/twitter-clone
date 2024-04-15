import { authClient, client } from "./client";
import type User from "@/models/User";
import type Tweet from "@/models/Tweet";
import { type BaseTweet } from "@/models/Tweet";
import type { BaseUser } from "@/models/User";

interface LoginResponse {
  data: {
    attributes: User;
  };
}

interface TweetResponse {
  data: {
    id: string;
    attributes: BaseTweet;
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
  included: {
    id: string;
    attributes: BaseUser;
  }[];
}

export async function login(user: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  return (await client.post<LoginResponse>("/login", { user })).data;
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

export async function updateUser(user: {
  id?: string;
  name?: string;
  bannerImage?: string;
}): Promise<User> {
  const res = await authClient.patch<User>(`/users/${user.id}`, { user });
  return res.data;
}

export async function updateBannerImage(payload: Blob) {
  const form = new FormData();
  form.append("image", payload);
  const res = await authClient.post("/me/banner-image", form);
  return res.data;
}

// TODO: maybe mobe this to profile store?
function transformTweetResponse(res: TweetResponse) {
  const userMap: { [key: string]: BaseUser } = res.included.reduce(
    (acc, value) => {
      return {
        [`${value.id}`]: {
          ...value.attributes,
          id: value.id,
        },
        ...acc,
      };
    },
    {}
  );

  return res.data.map(
    (i) =>
      ({
        ...i.attributes,
        id: i.id,
        user: userMap[i.relationships.user.data.id],
      } as Tweet)
  );
}
