import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import * as tweetApi from "@/api/endpoints/tweets";
import type { LoadingState } from "@/types/LoadingState";

export function useTweetEditor() {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  const loadingState = ref<LoadingState>();
  const tweetText = ref<string>("");
  const tweetMedia = ref<{ file: File; description?: string }[]>([]);

  const isPublishing = computed(() => loadingState.value === "idle");

  function addMediaItems(files: File[]) {
    tweetMedia.value = files.map((f) => ({ file: f }));
  }

  function removeMediaItem(index: number) {
    tweetMedia.value.splice(index, 1);
  }

  async function publishTweet() {
    const hasText = !!tweetText.value;
    const hasMedia = tweetMedia.value.length > 0;

    if (!hasText && !hasMedia) {
      return;
    }

    loadingState.value = "idle";

    try {
      let tweet;

      if (hasText) {
        tweet = await tweetApi.postTweet({ text: tweetText.value });
      }

      if (hasMedia) {
        tweet = await tweetApi.appendTweetMedia(
          { image: tweetMedia.value[0].file },
          tweet?.id ?? undefined
        );
      }

      if (profileStore.profileUser?.username === authStore.user?.username) {
        profileStore.tweetLists.default.tweets.unshift(tweet!);
      }

      loadingState.value = "resolved";
    } catch (err) {
      loadingState.value = "rejected";
    } finally {
      tweetText.value = "";
      tweetMedia.value = [];
    }
  }
  return {
    tweetText,
    tweetMedia,
    addMediaItems,
    removeMediaItem,
    publishTweet,
    isPublishing,
  };
}
