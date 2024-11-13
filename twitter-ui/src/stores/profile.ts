import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchProtectedProfileTweets } from "@/api/endpoints";
import type Tweet from "@/models/Tweet";
import { useAuthStore } from "./auth";
import { getQueryParams } from "@/api/helpers";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  // User of profile currently loaded
  const tweets = ref<Tweet[]>([]);
  const page = ref<number>(1); // TODO: might need to refactor this for loading other profile tabs
  const hasMore = ref<boolean>(true);
  const currentUsername = ref<string>("");

  async function loadProfileTweets(username: string) {
    if (!hasMore.value) return;

    const res = await fetchProtectedProfileTweets(username, page.value);

    const params = getQueryParams(res.links.next);
    setTweets(res.tweets);
    page.value = parseInt(params["page"]);
    hasMore.value = res.links.hasMore;
    currentUsername.value = username;
  }

  function setTweets(tweetList: Tweet[]): void {
    tweets.value = [...tweets.value, ...tweetList];
  }

  function addTweetToProfile(tweet: Tweet) {
    tweets.value.unshift(tweet);
  }

  function $reset() {
    tweets.value = [];
    page.value = 1;
    hasMore.value = true;
    currentUsername.value = "";
  }

  return {
    currentUsername,
    tweets,
    loadProfileTweets,
    setTweets,
    addTweetToProfile,
    $reset,
  };
});
