import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import { postTweet } from "@/api/endpoints/tweets";

export function useTweetEditor() {
  const profileStore = useProfileStore();
  const authStore = useAuthStore();

  const tweetText = ref<string>("");

  async function publishTweet() {
    if (tweetText.value.length < 1) {
      return;
    }

    try {
      const tweet = await postTweet({ text: tweetText.value });
      if (profileStore.profileUser?.username === authStore.user?.username) {
        profileStore.tweetLists.default.tweets.unshift(tweet);
      }
    } catch (err) {
      // TODO: show some error message
    } finally {
      tweetText.value = "";
    }
  }
  return { tweetText, publishTweet };
}
