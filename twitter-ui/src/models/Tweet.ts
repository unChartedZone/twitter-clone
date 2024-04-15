import type Media from "./Media";

export interface BaseTweet {
  id: string;
  text: string;
  totalLikes: number;
  totalRetweets: number;
  liked: boolean;
  retweeted: boolean;
  createdAt: string;
  medium: Media[];
}

export default interface Tweet extends BaseTweet {
  user?: {
    username: string;
    name: string;
    profileImage?: string;
  };
}
