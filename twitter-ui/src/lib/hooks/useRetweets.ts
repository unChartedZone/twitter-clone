import { authClient } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { RetweetedTweetsResponse } from "../types/responses";

export default function useRetweets(username?: string, page?: number) {
  const { data: tweets, isLoading } = useQuery({
    queryKey: ["retweeted-tweets", username],
    queryFn: async () => {
      const url = `/tweets/profile/${username}/replied`;
      const res = await authClient.get<RetweetedTweetsResponse>(url, {
        params: { page },
      });
      return res.data.tweets;
    },
    enabled: !!username && !!page,
  });

  const retweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      await authClient.post(`/tweets/${tweetId}/retweet`);
    },
  });

  const unretweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      await authClient.post(`/tweets/${tweetId}/unretweet`);
    },
  });

  return {
    tweets,
    isLoading,
    retweetMutation,
    unretweetMutation,
  };
}
