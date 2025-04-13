import type { BaseTweet } from "@/models/Tweet";
import { type User } from "@/models/User";
import type Comment from "@/models/Comment";
import type Notification from "@/models/Notification";
import type Thread from "@/models/Thread";
import type { Message } from "@/models/Message";

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
  currentPage: number;
  nextPage?: number;
  hasMore: boolean;
}

export interface Response<T> {
  data: Data<T>;
}

export interface ResponseList<T, U = {}> {
  data: Data<T>[];
  included: Data<U>[];
  links: Pagination;
}

export interface LoginResponse extends BaseResponse<User> {
  meta: {
    accessToken: string;
  };
}
export interface UserResponse extends BaseResponse<User> {}
export interface ExploreUsersResponse {
  data: Data<User>[];
}

export interface FollowingResponse {
  data: Data<User>[];
}

export interface TweetResponse {
  data: Data<BaseTweet>;
  included: Data<User>[];
}

export interface TweetListResponse {
  data: Data<BaseTweet>[];
  included: Data<User>[];
  links: Pagination;
}

export interface CommentListResponse extends ResponseList<Comment> {}
export interface CommentResponse extends Response<Comment> {}
export interface NotificationListResponse extends ResponseList<Notification> {}
export interface ChatThreadResponse extends Response<Thread> {}
export interface ChatThreadListResponse extends ResponseList<Thread> {}
export interface ChatMessageListResponse extends ResponseList<Message> {}
export interface ChatMessageResponse extends Response<Message> {}

export interface ErrorResponse {
  data: {
    message: string;
  };
}
