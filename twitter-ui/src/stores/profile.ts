import { ref } from "vue";
import { defineStore } from "pinia";
import {
  fetchUserTweets,
  fetchProfileTweets,
  fetchProtectedProfileTweets,
} from "@/api/endpoints";
import type Tweet from "@/models/Tweet";
import { useAuthStore } from "./auth";
import { getQueryParams } from "@/api/helpers";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  const tweets = ref<Tweet[]>([]);
  const page = ref<number>(1); // TODO: might need to refactor this for loading other profile tabs
  const hasMore = ref<boolean>(true);

  async function loadProfileTweets() {
    if (!authStore.user?.username || !hasMore.value) return;

    const res = await fetchProtectedProfileTweets(
      authStore.user?.username,
      page.value
    );

    const params = getQueryParams(res.links.next);
    setTweets(res.tweets);
    page.value = parseInt(params["page"]);
    hasMore.value = res.links.hasMore;
  }

  function setTweets(tweetList: Tweet[]): void {
    tweets.value = [...tweets.value, ...tweetList];
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
