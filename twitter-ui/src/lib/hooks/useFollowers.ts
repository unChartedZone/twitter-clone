import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { client } from "../api/client";

export default function useFollowers(username?: string) {
  const queryClient = useQueryClient();

  const { data: followers, isLoading } = useQuery({
    queryKey: ["followers"],
    queryFn: async () => {
      const { data, error } = await client.GET("/users/followers", {
        params: { query: { username: username ?? "" } },
      });

      if (error) return [];
      return data?.followers;
    },
    enabled: !!username,
  });

  const followUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await client.POST("/users/follow/{id}", {
        params: { path: { id: userId } },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explore-users"] });
    },
  });

  /**
   * Unfollow a user
   * @param userId User ID of user being unfollowed
   */
  const unfollowUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await client.POST("/users/unfollow/{id}", {
        params: { path: { id: userId } },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["explore-users"] });
    },
  });

  return {
    followers,
    isLoading,
    followUserMutation,
    unfollowUserMutation,
  };
}
