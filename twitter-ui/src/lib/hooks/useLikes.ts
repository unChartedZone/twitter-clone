import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth";

export default function useLikes(page?: number, username?: string) {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const likeTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await client.POST("/tweets/{id}/like", {
        params: { path: { id: tweetId } },
      });
      return res.data?.tweet;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["liked-tweets", authStore.user?.username],
      });
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["liked-tweets", authStore.user?.username],
      });
    },
  });

  return {
    likeTweetMutation,
    unlikeTweetMutation,
  };
}
