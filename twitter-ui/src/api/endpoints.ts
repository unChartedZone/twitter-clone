import { authClient, client } from "./client";
import type User from "@/models/User";
import type Tweet from "@/models/Tweet";

interface LoginResponse {
  data: {
    attributes: User;
  };
}

interface TweetResponse {
  data: {
    id: string;
    attributes: Tweet;
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
