import { useQuery } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";

export default function useTweetDetails(tweetId: string) {
  const { data: tweet, isLoading } = useQuery({
    queryKey: ["tweet-details", tweetId],
    queryFn: async () => {
      const res = await client.GET("/tweets/{id}", {
        params: { path: { id: tweetId } },
      });
      return res.data?.tweet;
    },
  });

  return {
    tweet,
    isLoading,
  };
}
