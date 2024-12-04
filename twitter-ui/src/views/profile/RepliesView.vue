<script setup lang="ts">
import { useProfileTweets } from "@/hooks/useProfileTweets";
import { useProfileStore } from "@/stores/profile";
import TweetList from "@/components/profile/TweetList.vue";

const profileStore = useProfileStore();
useProfileTweets("replied");
</script>

<template>
  <div>
    <TweetList
      :tweets="profileStore.tweetLists.replied.tweets"
      :loading="profileStore.tweetLists.loading === 'idle'"
    />
  </div>
</template>
