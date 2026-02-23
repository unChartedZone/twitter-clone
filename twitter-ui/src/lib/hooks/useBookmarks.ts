import { useMutation, useQuery } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { BookmarksResponse } from "../types/responses";

export default function useBookmarks() {
  const { data: bookmarkedTweets, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await authClient.get<BookmarksResponse>("/bookmarks");
      return res.data.tweets;
    },
  });

  return {
    bookmarkedTweets,
    isLoading,
  };
}
