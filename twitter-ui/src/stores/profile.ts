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
  const initialLoad = ref<boolean>(false);

  async function loadProfileTweets() {
    if (initialLoad.value || !authStore.user?.username) return;
    const profileTweets = await fetchProtectedProfileTweets(
      authStore.user?.username
    );
    if (profileTweets) {
      setTweets(profileTweets);
      initialLoad.value = true;
    }
  }

  function setTweets(tweetList: Tweet[]): void {
    tweets.value = tweetList;
  }

  function addTweetToProfile(tweet: Tweet) {
    tweets.value.unshift(tweet);
  }

  function $reset() {
    tweets.value = [];
  }

  return {
    tweets,
    loadProfileTweets,
    setTweets,
    addTweetToProfile,
    $reset,
  };
});
