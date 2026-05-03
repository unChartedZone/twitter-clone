import { client } from "@/lib/api/client";
import { useMutation } from "@tanstack/vue-query";

export default function useRetweets(username?: string, page?: number) {
  const retweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      await client.POST("/tweets/{id}/retweet", {
        params: { path: { id: tweetId } },
      });
    },
  });

  const unretweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      await client.POST("/tweets/{id}/unretweet", {
        params: { path: { id: tweetId } },
      });
    },
  });

  return {
    retweetMutation,
    unretweetMutation,
  };
}
