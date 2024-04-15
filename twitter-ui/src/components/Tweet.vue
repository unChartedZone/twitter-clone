<template>
  <div class="tweet">
    <div>
      <img class="tweet__profile-pic" :src="tweet.user?.profileImage" alt="" />
    </div>
    <div>
      <div class="tweet__header">
        <span>{{ tweet.user?.name }}</span>
        <span>@{{ tweet.user?.username }}</span>
      </div>
      <p>{{ tweet.text }}</p>
      <img
        v-for="media in tweet.medium"
        :src="media.url"
        :alt="media.description"
        style="width: 100px; height: 100px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Tweet from "@/models/Tweet";

interface TweetProps {
  tweet: Tweet;
}

defineProps<TweetProps>();
</script>

<style scoped lang="scss">
.tweet {
  min-height: 20rem;

  &__profile-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
