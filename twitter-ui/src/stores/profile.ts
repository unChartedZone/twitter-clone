import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import {
  fetchProtectedProfileTweets,
  fetchTweets,
} from "@/api/endpoints/tweets";
import type Tweet from "@/models/Tweet";
import { useAuthStore } from "./auth";
import { getQueryParams } from "@/api/helpers";
import type { LoadingState } from "@/types/LoadingState";
import type {
  TweetListSegment,
  TweetList,
  TweetListState,
} from "@/types/TweetList";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  // User of profile currently loaded
  const tweets = ref<Tweet[]>([]);

  const initalTweetListState: TweetListState = {
    loading: "idle",
    default: {
      tweets: [],
      page: 1,
      hasMore: true,
    },
    replied: {
      tweets: [],
      page: 1,
      hasMore: true,
    },
    media: {
      tweets: [],
      page: 1,
      hasMore: true,
    },
    liked: {
      tweets: [],
      page: 1,
      hasMore: true,
    },
  };

  const tweetLists = reactive<TweetListState>(
    structuredClone(initalTweetListState)
  );

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

  async function loadTweets(username: string, segment: TweetListSegment) {
    // The respective segment cannot fetch anymore tweets so we just leave
    if (!tweetLists[segment].hasMore) return;

    tweetLists.loading = "idle";

    const response = await fetchTweets(
      username,
      tweetLists[segment].page,
      segment
    );
    const params = getQueryParams(response.links.next);
    tweetLists[segment].tweets = [
      ...tweetLists[segment].tweets,
      ...response.tweets,
    ];
    tweetLists[segment].page = parseInt(params["page"]);
    tweetLists[segment].hasMore = response.links.hasMore;
    tweetLists.loading = "resolved";
  }

  function setTweets(tweetList: Tweet[]): void {
    tweets.value = [...tweets.value, ...tweetList];
  }

  function addTweetToProfile(tweet: Tweet) {
    tweets.value.unshift(tweet);
  }

  function $reset() {
    console.log("Resetting profile");
    tweets.value = [];
    page.value = 1;
    hasMore.value = true;
    currentUsername.value = "";
    Object.assign(tweetLists, structuredClone(initalTweetListState));
  }

  return {
    currentUsername,
    tweets,
    loadProfileTweets,
    setTweets,
    addTweetToProfile,
    tweetLists,
    loadTweets,
    $reset,
  };
});
