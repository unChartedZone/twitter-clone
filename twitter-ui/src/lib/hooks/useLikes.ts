import { useQuery, keepPreviousData, useMutation } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";

export default function useLikes(page?: number, username?: string) {
  const { data: tweets, isPending } = useQuery({
    queryKey: ["liked-tweets", username],
    queryFn: async () => {
      if (!username) return;
      const res = await client.GET("/tweets/profile/{username}/liked", {
        params: { path: { username }, query: { page } },
      });
      return res.data?.tweets;
    },
    enabled: !!username && !!page,
    placeholderData: keepPreviousData,
  });

  const likeTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await client.POST("/tweets/{id}/like", {
        params: { path: { id: tweetId } },
      });
      return res.data?.tweet;
    },
  });

  const unlikeTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      try {
        await client.POST("/tweets/{id}/unlike", {
          params: { path: { id: tweetId } },
        });
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
