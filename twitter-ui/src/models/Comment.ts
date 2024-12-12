import type { UserSummary } from "./User";

export interface CommentMedia {
  id: string;
  altText?: string;
  mediaUrl: string;
}

export default interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: UserSummary;
  commentMedia: CommentMedia[];
}
