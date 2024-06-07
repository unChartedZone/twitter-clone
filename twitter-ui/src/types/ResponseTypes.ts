import type { BaseTweet } from "@/models/Tweet";
import { type BaseUser } from "@/models/User";
import type User from "@/models/User";

interface RelationData {
  id: string;
  type: string;
}

interface Data<T> {
  id: string;
  type: string;
  attributes: T;
  relationships?: { user: { data: RelationData } };
}

interface BaseResponse<T> {
  data: Data<T>;
}

export interface LoginResponse extends BaseResponse<User> {}
export interface UserResponse extends BaseResponse<BaseUser> {}

export interface TweetResponse {
  data: Data<BaseTweet>[];
  included: Data<BaseUser>[];
}
