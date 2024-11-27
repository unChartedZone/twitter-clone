import type Tweet from "@/models/Tweet";
import type { LoadingState } from "./LoadingState";

export type TweetListSegment = "default" | "media" | "liked";

export interface TweetList {
  tweets: Tweet[];
  page: number;
  hasMore: boolean;
}

export interface TweetListState {
  loading: LoadingState;
  default: TweetList;
  media: TweetList;
  liked: TweetList;
}
