<script setup lang="ts">
import type TweetType from "@/models/Tweet";
import TweetCard from "../Tweet.vue";
import LoadingIcon from "../common/LoadingIcon.vue";
import type { Tweet } from "@/lib/types/models";

interface TweetListProps {
  tweets: Tweet[];
  loading: boolean;
}

defineProps<TweetListProps>();
</script>

<template>
  <ul class="tweet-list">
    <TweetCard v-for="tweet in tweets" :tweet="tweet" />
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
