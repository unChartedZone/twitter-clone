import { useQuery, keepPreviousData, useMutation } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { LikedTweetsResponse } from "../types/responses";

export default function useLikes(page?: number, username?: string) {
  const { data: tweets, isPending } = useQuery({
    queryKey: ["liked-tweets", username],
    queryFn: async () => {
      const url = `/tweets/profile/${username}/liked`;
      const res = await authClient.get<LikedTweetsResponse>(url, {
        params: { page },
      });
      return res.data.tweets;
    },
    enabled: !!username && !!page,
    placeholderData: keepPreviousData,
  });

  const likeTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await authClient.post(`/tweets/${tweetId}/like`);
      return res.data.tweet;
    },
  });

  const unlikeTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      try {
        await authClient.post(`/tweets/${tweetId}/unlike`);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject("Failed to unlike tweet");
      }
    },
  });

  return {
    tweets,
    isPending,
    likeTweetMutation,
    unlikeTweetMutation,
  };
}
