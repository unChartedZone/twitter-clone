<template>
  <div class="tweet">
    <div class="tweet__profile-pic">
      <img :src="tweet.user?.profileImage" alt="" />
    </div>
    <div class="tweet__body">
      <TweetHeader :tweet="tweet" />
      <div class="tweet__text">
        <p>{{ tweet.text }}</p>
      </div>
      <div class="tweet__media" v-if="tweet.medium.length > 0">
        <img
          v-for="media in tweet.medium"
          :src="media.url"
          :alt="media.description"
        />
      </div>
      <TweetActions :tweet="tweet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Tweet from "@/models/Tweet";
import TweetHeader from "./tweet/TweetHeader.vue";
import TweetActions from "@/components/tweet/TweetActions.vue";

interface TweetProps {
  tweet: Tweet;
}

defineProps<TweetProps>();
</script>

<style scoped lang="scss">
.tweet {
  display: grid;
  grid-template-columns: 10% 90%;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem 0.75rem 0;
  font-size: 15px;

  &__profile-pic {
    display: flex;
    justify-content: center;

    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__media {
    border: 1px solid rgba(207, 217, 222, 1);
    border-radius: 1rem;
    width: 100%;
    overflow: hidden;

    img {
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
