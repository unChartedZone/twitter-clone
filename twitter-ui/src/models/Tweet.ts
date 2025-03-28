import type Media from "./Media";

export interface BaseTweet {
  id: string;
  text: string;
  totalComments: number;
  totalLikes: number;
  totalRetweets: number;
  liked: boolean;
  retweeted: boolean;
  bookmarked: boolean;
  createdAt: Date;
  medium: Media[];
}

export default interface Tweet extends BaseTweet {
  user?: {
    username: string;
    name: string;
    profileImage?: string;
  };
}
