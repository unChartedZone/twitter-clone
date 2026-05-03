import { computed, toValue, watch, type MaybeRefOrGetter } from "vue";
import { client } from "@/lib/api/client";
import { useIsBottom } from "@/hooks/useIsBottom";
import { useInfiniteQuery } from "@tanstack/vue-query";

type TweetListSegment = "default" | "liked" | "replied" | "media";

/**
 * Fetches tweets from a profile for a given username, segment, and page number.
 *
 * @param username - The username of the profile whose tweets are to be fetched.
 * @param segment - Profile segment for the 4 tabs available on the Profile page
 * @param page - The page number for pagination (default is 1).
 * @returns A promise that resolves to an object containing:
 *          - `tweets`: An array of `Tweet` objects.
 *          - `links`: Pagination information.
 *
 * @throws Will throw an error if the request fails.
 */
export const fetchTweetList = async (
  username: string,
  segment: TweetListSegment,
  page: number,
) => {
  const { data, error } = await client.GET(
    `/tweets/profile/{username}/${segment}`,
    { params: { path: { username }, query: { page } } },
  );

  if (!data || error)
    throw Error(`Failed to load ${segment} tweets for ${username}`);

  return data;
};

export default function useTweetList(
  username: MaybeRefOrGetter<string>,
  segment: TweetListSegment,
) {
  const { isBottom } = useIsBottom();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: computed(() => [`${segment}-tweets`, toValue(username)]),
      queryFn: ({ pageParam }) =>
        fetchTweetList(toValue(username), segment, pageParam),
      initialPageParam: 1,
      getNextPageParam: ({ meta }) =>
        meta.links.hasMore ? meta.links.nextPage : undefined,
    });

  const tweets = computed(() => data.value?.pages.flatMap((p) => p.tweets));

  watch(isBottom, (val, _oldVal) => {
    if (val && hasNextPage.value && !isFetchingNextPage.value) {
      fetchNextPage();
    }
  });

  return {
    tweets,
    isLoading,
  };
}
