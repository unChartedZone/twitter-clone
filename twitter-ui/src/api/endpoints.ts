import { authClient, client } from "./client";
import type User from "@/models/User";
import type Tweet from "@/models/Tweet";
import type { BaseUser, UserPatch } from "@/models/User";
import type {
  LoginResponse,
  UserResponse,
  TweetListResponse,
  ExploreUsersResponse,
  BaseResponse,
  FollowingResponse,
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

export async function exploreUsers(): Promise<BaseUser[]> {
  const res = await authClient.get<ExploreUsersResponse>("/users/explore");
  return res.data.data.map((x) => x.attributes);
}

export async function fetchUserByUsername(username: string): Promise<BaseUser> {
  const res = await authClient.get<BaseResponse<BaseUser>>(
    `/users/${username}`
  );

  return res.data.data.attributes;
}

export async function fetchFollowing(username: string): Promise<BaseUser[]> {
  const res = await authClient.get<FollowingResponse>("/users/following", {
    params: { username },
  });
  return res.data.data.map((x) => x.attributes);
}

export async function fetchFollowers(username: string): Promise<BaseUser[]> {
  const res = await authClient.get<FollowingResponse>("/users/followers", {
    params: { username },
  });
  return res.data.data.map((x) => x.attributes);
}

export async function followUser(userId: string) {
  // TODO: update this when I create a serializer for followers
  const res = await authClient.post<{ followed_user: BaseUser }>(
    `/users/follow/${userId}`
  );
  return res.data;
}

/**
 * Unfollow a user
 * @param userId User ID of user being unfollowed
 */
export async function postUnfollowUser(userId: string): Promise<void> {
  await authClient.post(`/users/unfollow/${userId}`);
}
