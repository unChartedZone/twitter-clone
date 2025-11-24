import type Attachment from "./Attachment";
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
  attachments: Attachment[];
  user?: UserSummary;
}
