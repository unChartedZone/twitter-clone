import { authClient } from "@/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type {
  CommentsResponse,
  CreateCommentResponse,
} from "../types/responses";

export default function useComments(tweetId?: string) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", tweetId],
    queryFn: async () => {
      const res = await authClient.get<CommentsResponse>(
        `/comments?tweet_id=${tweetId}`,
      );
      return res.data.comments;
    },
    enabled: !!tweetId,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (payload: {
      tweetId: string;
      commentContent: string;
    }) => {
      const formData = new FormData();
      formData.append("comment[content]", payload.commentContent);
      const res = await authClient.post<CreateCommentResponse>(
        `/comments?tweet_id=${payload.tweetId}`,
        formData,
      );
      return res.data.comment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return {
    comments,
    isLoading,
    createCommentMutation,
  };
}
