import axios from "axios";
import { authClient, client } from "./client";
import type { User, UserPatch } from "@/models/User";
import type {
  UserResponse,
  FollowingResponse,
  LoginResponse,
} from "@/types/ResponseTypes";
import { AxiosError } from "axios";
import type { LoginBody } from "@/lib/types/responses";

export async function login(user: LoginBody): Promise<LoginResponse> {
  const result = (await client.post<LoginResponse>("/login", { user })).data;
  return result;
}

export async function signupUser(payload: {
  username: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
}) {
  const res = await client.post<LoginResponse>("/signup", { user: payload });
  return res.data;
}

export async function refresh(): Promise<LoginResponse> {
  return (await client.post("/refresh")).data;
}

export async function logout() {
  return client.post("/logout");
}

export async function changePassword(passwordPatch: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return await authClient
    .patch("/password", passwordPatch)
    .catch((e: Error | AxiosError) => {
      if (axios.isAxiosError(e)) {
        return Promise.reject(new Error(e.response?.data.message));
      }
    });
}

export async function patchUser(
  userId: string,
  userPatch: UserPatch,
  bannerImage?: File,
  profileImage?: File,
): Promise<User> {
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
    formData,
  );
  return res.data.data.attributes;
}

export async function fetchUserByUsername(username: string): Promise<User> {
  const res = await authClient.get<Promise<{ user: User }>>(
    `/users/${username}`,
  );

  return (await res.data).user;
}
