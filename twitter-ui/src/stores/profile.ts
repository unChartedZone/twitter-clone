import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchUserTweets } from "@/api/endpoints";
import type Tweet from "@/models/Tweet";

export const useProfileStore = defineStore("profile", () => {
  const tweets = ref<Tweet[]>([]);

  async function loadProfileTweets() {
    if (tweets.value.length > 0) return;
    const userTweets = await fetchUserTweets();
    tweets.value = userTweets;
  }

  return {
    tweets,
    loadProfileTweets,
  };
});
