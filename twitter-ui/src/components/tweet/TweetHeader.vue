<script setup lang="ts">
import dayjs from "dayjs";
import type Tweet from "@/models/Tweet";

interface TweetHeaderProps {
  tweet: Tweet;
}

defineProps<TweetHeaderProps>();
</script>

<template>
  <div class="tweet__header">
    <strong class="name">{{ tweet.user?.name }}</strong>
    <span class="username">@{{ tweet.user?.username }}</span>
    <span>&middot;</span>
    <span class="created-timestamp">
      {{ dayjs(tweet.createdAt).format("MMM D, YYYY") }}
    </span>
  </div>
</template>

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
