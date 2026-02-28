import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type {
  BookmarksResponse,
  BookmarkTweetResponse,
  UnbookmarkTweetResponse,
} from "../types/responses";

export default function useBookmarks() {
  const queryClient = useQueryClient();

  const { data: bookmarkedTweets, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await authClient.get<BookmarksResponse>("/bookmarks");
      return res.data.tweets;
    },
  });

  const bookmarkTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await authClient.post<BookmarkTweetResponse>(
        `/bookmarks?tweet_id=${tweetId}`,
      );
      return res.data;
    },
  });

  const unbookmarkTweetMutation = useMutation({
    mutationFn: async (tweetId: string) => {
      const res = await authClient.delete<UnbookmarkTweetResponse>(
        `/bookmarks/${tweetId}`,
      );
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
