import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { fetchTweets } from "@/api/endpoints/tweets";
import { useAuthStore } from "./auth";
import { getQueryParams } from "@/api/helpers";
import type { LoadingState } from "@/types/LoadingState";
import type { TweetListSegment, TweetListState } from "@/types/TweetList";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  // User of profile currently loaded
  const username = ref<string>("");

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
    tweetLists[segment].page = !params["page"] ? 1 : parseInt(params["page"]);
    tweetLists[segment].hasMore = response.links.hasMore;
    tweetLists.loading = "resolved";
  }

  function setUsername(u: string) {
    username.value = u;
  }

  function $reset() {
    username.value = "";
    Object.assign(tweetLists, structuredClone(initalTweetListState));
  }

  return {
    username,
    setUsername,
    tweetLists,
    loadTweets,
    $reset,
  };
});
