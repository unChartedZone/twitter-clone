import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { client } from "../api/client";

export default function useBookmarks() {
  const queryClient = useQueryClient();

  const { data: bookmarkedTweets, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await client.GET("/bookmarks");
      return res.data?.tweets ?? [];
    },
  });

  const bookmarkTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await client.POST("/bookmarks", {
        params: { query: { tweetId } },
      });
      return res.data;
    },
  });

  const unbookmarkTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await client.DELETE("/bookmarks/{tweetId}", {
        params: { path: { tweetId } },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  return {
    bookmarkedTweets,
    isLoading,
    bookmarkTweetMutation,
    unbookmarkTweetMutation,
  };
}
