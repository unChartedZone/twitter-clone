import type Media from "./Media";
import type { UserSummary } from "./User";

export default interface Tweet {
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
  user?: UserSummary;
}
