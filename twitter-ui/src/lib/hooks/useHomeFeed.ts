import { useQuery } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { HomeFeedResponse } from "../types/responses";

export default function useHomeFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-feed"],
    queryFn: async () => {
      const res = await authClient.get<HomeFeedResponse>("/tweets/feed");
      return res.data.tweets;
    },
  });

  return {
    tweets: data,
    isLoading,
  };
}
