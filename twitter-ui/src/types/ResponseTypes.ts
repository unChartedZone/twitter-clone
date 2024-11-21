import type { BaseTweet } from "@/models/Tweet";
import { type BaseUser } from "@/models/User";
import type User from "@/models/User";

interface RelationData {
  id: string;
  type: string;
}

export interface Data<T> {
  id: string;
  type: string;
  attributes: T;
  relationships?: { user: { data: RelationData } };
}

export interface BaseResponse<T> {
  data: Data<T>;
}

export interface Pagination {
  first: string;
  last: string;
  next: string;
  prev: string;
  hasMore: boolean;
}

export interface LoginResponse extends BaseResponse<User> {}
export interface UserResponse extends BaseResponse<BaseUser> {}
export interface ExploreUsersResponse {
  data: Data<BaseUser>[];
}

export interface FollowingResponse {
  data: Data<BaseUser>[];
}

export interface TweetResponse {
  data: Data<BaseTweet>;
  included: Data<BaseUser>[];
}

export interface TweetListResponse {
  data: Data<BaseTweet>[];
  included: Data<BaseUser>[];
  links: Pagination;
}

export interface ErrorResponse {
  data: {
    message: string;
  };
}
