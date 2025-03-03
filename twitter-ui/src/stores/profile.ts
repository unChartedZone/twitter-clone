import { ref, reactive, watch, computed } from "vue";
import { defineStore } from "pinia";
import * as tweetApi from "@/api/endpoints/tweets";
import { fetchUserByUsername } from "@/api/endpoints";
import type { LoadingState } from "@/types/LoadingState";
import type { TweetListSegment, TweetListState } from "@/types/TweetList";
import type { User } from "@/models/User";

export const useProfileStore = defineStore("profile", () => {
  // User of profile currently loaded
  const loadingUser = ref<LoadingState>();
  const profileUser = ref<User>();

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

  const tweetLists = reactive(structuredClone(initalTweetListState));

  const isLoadingUser = computed(() => loadingUser.value === "idle");

  async function loadTweets(
    username: string,
    page: number,
    segment: TweetListSegment
  ) {
    tweetLists.loading = "idle";

    try {
      const { tweets, links } = await tweetApi.fetchTweets(
        username,
        page,
        segment
      );
      tweetLists.loading = "resolved";
      tweetLists[segment].tweets = [...tweetLists[segment].tweets, ...tweets];
      tweetLists[segment].hasMore = links.hasMore;
      if (links.hasMore && !!links.nextPage) {
        tweetLists[segment].page = links.nextPage;
      }
    } catch (e) {
      tweetLists.loading = "rejected";
    }
  }

  async function loadProfileUser(username: string) {
    loadingUser.value = "idle";

    try {
      const user = await fetchUserByUsername(username);
      setProfileUser(user);
      loadingUser.value = "resolved";
    } catch (e) {
      loadingUser.value = "rejected";
    }
  }

  function setProfileUser(user: User) {
    profileUser.value = { ...user };
  }

  function $reset() {
    loadingUser.value = undefined;
    profileUser.value = undefined;
    Object.assign(tweetLists, { ...structuredClone(initalTweetListState) });
  }

  return {
    tweetLists,
    profileUser,
    isLoadingUser,
    loadTweets,
    loadProfileUser,
    setProfileUser,
    $reset,
  };
});
