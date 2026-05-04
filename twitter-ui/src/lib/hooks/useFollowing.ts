import { useQuery } from "@tanstack/vue-query";
import { client } from "../api/client";

export default function useFollowing(username: string = "") {
  const { data: following, isLoading } = useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      const { data, error } = await client.GET("/users/following", {
        params: { query: { username } },
      });

      if (error) return [];
      return data?.followers;
    },
    enabled: !!username,
  });

  return {
    following,
    isLoading,
  };
}
