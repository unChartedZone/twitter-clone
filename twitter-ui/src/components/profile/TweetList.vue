<script setup lang="ts">
import TweetCard from "../TweetCard.vue";
import LoadingIcon from "../common/LoadingIcon.vue";
import type { Tweet } from "@/lib/types/models";

interface TweetListProps {
  tweets: Tweet[] | undefined;
  loading: boolean;
}

defineProps<TweetListProps>();
</script>

<template>
  <ul class="tweet-list">
    <TweetCard v-for="tweet in tweets" :tweet="tweet" />
    <div v-if="loading" class="loading-icon">
      <LoadingIcon />
    </div>
  </ul>
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
