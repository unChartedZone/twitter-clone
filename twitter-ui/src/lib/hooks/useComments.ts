import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type {
  CommentsResponse,
  CreateCommentResponse,
} from "../types/responses";
import { client } from "@/lib/api/client";

export default function useComments(tweetId?: string) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", tweetId],
    queryFn: async () => {
      if (!tweetId) return;

      const res = await client.GET("/comments", {
        params: { query: { tweetId } },
      });
      return res.data?.comments;
    },
    enabled: !!tweetId,
  });

  const createCommentMutation = useMutation({
    mutationFn: async (payload: {
      tweetId: string;
      commentContent: string;
    }) => {
      const res = await client.POST("/comments", {
        body: {
          comment: { content: payload.commentContent },
          tweetId: payload.tweetId,
        },
      });
      return res.data?.comment;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.tweetId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tweet-details", variables.tweetId],
      });
    },
  });

  return {
    comments,
    isLoading,
    createCommentMutation,
  };
}
