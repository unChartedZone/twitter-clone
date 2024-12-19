<script setup lang="ts">
import type TweetType from "@/models/Tweet";
import Tweet from "../Tweet.vue";
import LoadingIcon from "../common/LoadingIcon.vue";

interface TweetListProps {
  tweets: TweetType[];
  loading: boolean;
}

defineProps<TweetListProps>();
</script>

<template>
  <ul class="tweet-list">
    <Tweet v-for="tweet in tweets" :tweet="tweet" />
  </ul>
  <div v-if="loading" class="loading-icon">
    <LoadingIcon />
  </div>
</template>

<style scoped lang="scss">
.tweet-list {
  padding: 0 0 1rem;
}

.loading-icon {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
