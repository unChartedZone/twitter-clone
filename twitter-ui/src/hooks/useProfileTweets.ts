import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useThrottleFn } from "@vueuse/core";
import type { TweetListSegment } from "@/types/TweetList";
import { useProfileStore } from "@/stores/profile";
import { useIsBottom } from "@/hooks/useIsBottom";

/**
 * Hook to load profile tweets for a given segment
 * @param segment Profile list segment to load
 */
export function useProfileTweets(segment: TweetListSegment) {
  const route = useRoute();
  const profileStore = useProfileStore();
  const { isBottom } = useIsBottom();

  const throttledTweetFetch = useThrottleFn(
    async () =>
      await profileStore.loadTweets(
        route.params.username[0],
        profileStore.tweetLists[segment].page,
        segment
      )
  );

  onMounted(() => {
    if (
      profileStore.tweetLists[segment].tweets.length > 0 &&
      route.params.username[0] === profileStore.profileUser?.username
    )
      return;

    profileStore.loadTweets(route.params.username[0], 1, segment);
  });

  // For when a user scrolls to the bottom of a page
  watch(isBottom, async (val, oldVal) => {
    if (val && profileStore.tweetLists[segment].hasMore) {
      throttledTweetFetch();
    }
  });
}
