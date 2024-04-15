<template>
  <div class="tweet__header">
    <strong class="name">{{ tweet.user?.name }}</strong>
    <span class="username">@{{ tweet.user?.username }}</span>
    <span>&middot;</span>
    <span class="created-timestamp">{{ tweet.createdAt }}</span>
  </div>
</template>

<script setup lang="ts">
import type Tweet from "@/models/Tweet";

interface TweetHeaderProps {
  tweet: Tweet;
}

defineProps<TweetHeaderProps>();
</script>

<style scoped lang="scss">
.tweet {
  &__header {
    display: flex;
    gap: 0.5rem;

    .username,
    .created-timestamp {
      color: $gray-300;
    }
  }
}
</style>
