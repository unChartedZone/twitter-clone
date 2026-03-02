import { useQuery } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { TweetDetailsResponse } from "../types/responses";

export default function useTweetDetails(tweetId: string) {
  const { data: tweet, isLoading } = useQuery({
    queryKey: ["tweet-details", tweetId],
    queryFn: async () => {
      const res = await authClient.get<TweetDetailsResponse>(
        `/tweets/${tweetId}`,
      );
      return res.data.tweet;
    },
  });

  return {
    tweet,
    isLoading,
  };
}
