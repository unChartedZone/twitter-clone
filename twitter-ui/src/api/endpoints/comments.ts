import type {
  CommentListResponse,
  CommentResponse,
} from "@/types/ResponseTypes";
import { authClient } from "../client";
import type Comment from "@/models/Comment";

interface ContentPatch {
  content: string;
  // commentMediaAttributes: []
}

export async function fetchComents(tweetId: string): Promise<Comment[]> {
  const res = await authClient.get<CommentListResponse>(
    `/comments?tweet_id=${tweetId}`
  );
  return res.data.comments;
}

export async function createComment(
  tweetId: string,
  commentPayload: ContentPatch
): Promise<Comment> {
  const formData = new FormData();
  formData.append("comment[content]", commentPayload.content);
  const res = await authClient.post<CommentResponse>(
    `/comments?tweet_id=${tweetId}`,
    formData
  );
  return res.data.comment;
}
