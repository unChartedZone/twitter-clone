<template>
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
        <span :style="{ color: tweet.retweeted ? 'green' : 'initial' }">{{
          tweet.totalRetweets
        }}</span>
      </div>
      <div class="tweet__action">
        <Icon v-if="tweet.liked" name="heart" :size="0.93" fill="red" />
        <Icon v-else name="heart-outline" :size="0.93" />
        <span :style="{ color: tweet.liked ? 'red' : 'initial' }">{{
          tweet.totalLikes
        }}</span>
      </div>
    </div>
    <div class="additional-actions">
      <Icon :size="0.93" name="bookmark-outline" />
      <Icon :size="0.93" name="share" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Tweet from "@/models/Tweet";

interface TweetActionsProps {
  tweet: Tweet;
}

defineProps<TweetActionsProps>();
</script>

<style scoped lang="scss">
.tweet {
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
    gap: 0.25rem;
  }
}
</style>
