import { useQuery } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";

export default function useHomeFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["home-feed"],
    queryFn: async () => {
      const res = await client.GET("/tweets/feed");
      return res.data?.tweets;
    },
  });

  return {
    tweets: data,
    isLoading,
  };
}
