import { ref } from "vue";
import { defineStore } from "pinia";
import {
  fetchUserTweets,
  fetchProfileTweets,
  fetchProtectedProfileTweets,
} from "@/api/endpoints";
import type Tweet from "@/models/Tweet";
import { useAuthStore } from "./auth";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  const tweets = ref<Tweet[]>([]);

  async function loadProfileTweets() {
    if (tweets.value.length > 0 || !authStore.user?.username) return;
    const profileTweets = await fetchProtectedProfileTweets(
      authStore.user?.username
    );
    if (profileTweets) {
      setTweets(profileTweets);
    }
  }

  function setTweets(tweetList: Tweet[]): void {
    tweets.value = tweetList;
  }

  function $reset() {
    tweets.value = [];
  }

  return {
    tweets,
    loadProfileTweets,
    setTweets,
    $reset,
  };
});
