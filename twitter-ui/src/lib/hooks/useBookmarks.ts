import { useMutation, useQuery } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { BookmarksResponse } from "../types/responses";

export default function useBookmarks() {
  const { data, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await authClient.get<BookmarksResponse>("/bookmarks");
      return res.data;
    },
  });

  return {
    bookmarkedTweets: data,
    isLoading,
  };
}
