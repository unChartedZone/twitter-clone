import { client } from "@/lib/api/client";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { RetweetedTweetsResponse } from "../types/responses";

export default function useRetweets(username?: string, page?: number) {
  const { data: tweets, isLoading } = useQuery({
    queryKey: ["retweeted-tweets", username],
    queryFn: async () => {
      if (!username) return;
      const res = await client.GET("/tweets/profile/{username}/replied", {
        params: { path: { username }, query: { page } },
      });
      return res.data?.tweets;
    },
    enabled: !!username && !!page,
  });

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
    tweets,
    isLoading,
    retweetMutation,
    unretweetMutation,
  };
}
