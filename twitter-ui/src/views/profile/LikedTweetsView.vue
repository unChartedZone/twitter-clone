<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";
import { useProfileTweets } from "@/hooks/useProfileTweets";
import TweetList from "@/components/profile/TweetList.vue";

const profileStore = useProfileStore();
useProfileTweets("liked");
</script>

<template>
  <div>
    <TweetList
      :tweets="profileStore.tweetLists.liked.tweets"
      :loading="profileStore.tweetLists.loading === 'idle'"
    />
  </div>
</template>
