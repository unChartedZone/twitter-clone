<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";
import TweetList from "@/components/profile/TweetList.vue";
import { useProfileTweets } from "@/hooks/useProfileTweets";

const profileStore = useProfileStore();
useProfileTweets("default");
</script>

<template>
  <div>
    <TweetList
      :tweets="profileStore.tweetLists.default.tweets"
      :loading="profileStore.tweetLists.loading === 'idle'"
    />
  </div>
</template>
