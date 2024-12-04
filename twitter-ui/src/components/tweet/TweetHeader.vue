<script setup lang="ts">
import { RouterLink } from "vue-router";
import dayjs from "dayjs";
import type Tweet from "@/models/Tweet";

interface TweetHeaderProps {
  tweet: Tweet;
}

defineProps<TweetHeaderProps>();
</script>

<template>
  <div class="tweet__header">
    <RouterLink class="tweet__user-link" :to="`/${tweet.user?.username}`">
      <strong class="name">{{ tweet.user?.name }}</strong>
      <span class="username">@{{ tweet.user?.username }}</span>
    </RouterLink>
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
    align-items: center;
    gap: 0.5rem;

    .username,
    .created-timestamp {
      color: $gray-300;
    }
  }

  &__user-link {
    display: flex;
    align-items: center;
    gap: 0.15rem;

    strong:hover {
      text-decoration: underline;
    }
  }
}
</style>
