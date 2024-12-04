import type Tweet from "@/models/Tweet";
import type { LoadingState } from "./LoadingState";

export type TweetListSegment = "default" | "replied" | "media" | "liked";

export interface TweetList {
  tweets: Tweet[];
  page: number;
  hasMore: boolean;
}

export interface TweetListState {
  loading: LoadingState;
  default: TweetList;
  replied: TweetList;
  media: TweetList;
  liked: TweetList;
}
