import type { User } from "@/stores/auth";
import { authClient, client } from "./client";

interface LoginResponse {
  accessToken: string;
  user: User;
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

export async function fetchUserTweets() {
  return (await authClient.get("/tweets")).data;
}
