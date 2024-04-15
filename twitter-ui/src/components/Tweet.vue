<template>
  <div class="tweet">
    <div class="tweet__profile-pic">
      <img :src="tweet.user?.profileImage" alt="" />
    </div>
    <div class="tweet__body">
      <div class="tweet__header">
        <strong class="name">{{ tweet.user?.name }}</strong>
        <span class="username">@{{ tweet.user?.username }}</span>
        <span>&middot;</span>
        <span class="created-timestamp">{{ tweet.createdAt }}</span>
      </div>
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
      <div class="tweet__actions">
        <div class="main-actions">
          <div class="tweet__action">
            <Icon name="reply" :size="0.93" />
            <span>54</span>
          </div>
          <div class="tweet__action">
            <Icon
              name="retweet"
              :size="0.93"
              :fill="tweet.retweeted ? 'green' : undefined"
            />
            <span>{{ tweet.totalRetweets }}</span>
          </div>
          <div class="tweet__action">
            <Icon
              name="heart"
              :size="0.93"
              :fill="tweet.liked ? 'red' : undefined"
            />
            <span>{{ tweet.totalLikes }}</span>
          </div>
        </div>
        <div class="additional-actions">
          <Icon :size="0.93" name="bookmark-outline" />
          <Icon :size="0.93" name="share" />
        </div>
      </div>
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
  display: grid;
  grid-template-columns: 1fr 7fr;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem 0.75rem 0;
  font-size: 15px;

  &__profile-pic {
    display: flex;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__header {
    display: flex;
    gap: 0.5rem;

    .username,
    .created-timestamp {
      color: $gray-300;
    }
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

  &__actions {
    display: flex;
    gap: 8rem;
  }

  .main-actions {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .additional-actions {
    display: flex;
    gap: 0.5rem;
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
