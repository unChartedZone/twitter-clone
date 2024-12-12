<template>
  <RouterLink
    :to="{
      name: 'TweetDetails',
      params: {
        tweetId: tweet.id,
        username: tweet.user?.username,
      },
    }"
  >
    <div class="tweet">
      <div class="tweet__profile-pic">
        <AvatarCircle :src="tweet.user?.profileImage" />
      </div>
      <div class="tweet__body">
        <TweetHeader :tweet="tweet" />
        <div class="tweet__text">
          <p>{{ tweet.text }}</p>
        </div>
        <div
          class="tweet__media"
          v-if="!!tweet.medium && tweet.medium.length > 0"
        >
          <Image
            v-for="media in tweet.medium"
            :key="media.id"
            :src="media.url"
            :alt="media.description"
          />
        </div>
        <TweetActionRow :tweet="tweet" size="icon-sm" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import type Tweet from "@/models/Tweet";
import TweetHeader from "./tweet/TweetHeader.vue";
import TweetActionRow from "@/components/tweet/TweetActionRow.vue";
import AvatarCircle from "./AvatarCircle.vue";
import Image from "./common/Image.vue";

interface TweetProps {
  tweet: Tweet;
}

defineProps<TweetProps>();
</script>

<style scoped lang="scss">
.tweet {
  border-bottom: 1px solid $gray-100;
  display: grid;
  grid-template-columns: 10% 90%;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem 1rem 0;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: $gray-100;
  }

  &__profile-pic {
    display: flex;
    justify-content: center;
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
