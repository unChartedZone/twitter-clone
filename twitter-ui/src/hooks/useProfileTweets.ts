import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
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

  const fetchProfileTweets = useDebounceFn(async () => {
    await profileStore.loadTweets(route.params["username"][0], segment);
  }, 300);

  // User has navigated to a completely 'new' profile page, so a refresh needs
  // to be done
  onMounted(async () => {
    await fetchProfileTweets();
  });

  // For when a user scrolls to the bottom of a page
  watch(isBottom, async (val, oldVal) => {
    if (val) {
      await fetchProfileTweets();
    }
  });

  // Used for when navigation between one user profile page and another, this
  // wouldn't cause a remounting of profile tweets view
  watch(
    () => route.params.username[0],
    async (user, oldUsername) => {
      if (user === oldUsername) return;
      profileStore.setUsername(user);
      await fetchProfileTweets();
    }
  );
}
