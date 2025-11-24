import type Tweet from "@/models/Tweet";
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

export interface LoginResponse {
  user: User;
  meta: {
    token: string;
  };
}
export interface UserResponse extends BaseResponse<User> {}
export interface ExploreUsersResponse {
  users: User[];
}

export interface FollowingResponse {
  followers: User[];
}

export interface TweetResponse {
  tweet: Tweet;
}

export interface TweetListResponse {
  tweets: Tweet[];
  meta: {
    links: Pagination;
  };
  // included: Data<User>[];
}

export interface CommentListResponse {
  comments: Comment[];
}
export interface CommentResponse {
  comment: Comment;
}
export interface NotificationListResponse {
  notifications: Notification[];
}
export interface ChatThreadResponse {
  thread: Thread;
}
export interface ChatThreadListResponse {
  threads: Thread[];
}
export interface ChatMessageListResponse {
  messages: Message[];
  meta: {
    links: Pagination;
  };
}
export interface ChatMessageResponse {
  message: Message;
}

export interface ErrorResponse {
  data: {
    message: string;
  };
}
