<template>
  <div class="tweet__actions">
    <div class="main-actions">
      <TweetAction
        icon="reply"
        :text="`${tweet.totalComments}`"
        :size="size"
        @action="$emit('replyTriggered', tweet.id)"
      />
      <TweetAction
        icon="retweet"
        :text="`${tweet.totalRetweets}`"
        activeIcon="retweet"
        :active="tweet.retweeted"
        color="success"
        @action="retweetTweet"
        @activeAction="unretweetTweet"
        :size="size"
      />
      <TweetAction
        icon="heart-outline"
        activeIcon="heart"
        :text="`${tweet.totalLikes}`"
        :active="tweet.liked"
        color="danger"
        @action="likeTweet"
        @activeAction="unlikeTweet"
        :size="size"
      />
    </div>
    <div class="additional-actions">
      <TweetAction
        icon="bookmark-outline"
        activeIcon="bookmark"
        :active="tweet.bookmarked"
        color="primary"
        @action="addBookmark"
        @activeAction="removeBookmark"
        :size="size"
      />
      <TweetAction icon="share" :size="size" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as bookmarkApi from "@/api/endpoints/bookmarks";
import * as likeApi from "@/api/endpoints/likes";
import * as retweetApi from "@/api/endpoints/retweet";
import type Tweet from "@/models/Tweet";
import TweetAction from "./TweetAction.vue";

interface TweetActionRowProps {
  tweet: Tweet;
  size: "icon" | "icon-sm";
}

const props = defineProps<TweetActionRowProps>();
const emit = defineEmits<{
  (event: "replyTriggered", tweetId: string): void;
}>();

async function addBookmark() {
  try {
    await bookmarkApi.bookmarkTweet(props.tweet.id);
    props.tweet.bookmarked = true;
  } catch (e) {}
}

async function removeBookmark() {
  try {
    await bookmarkApi.removeBookmarkedTweet(props.tweet.id);
    props.tweet.bookmarked = false;
  } catch (e) {}
}

async function likeTweet() {
  await likeApi.likeTweet(props.tweet.id);
  props.tweet.liked = true;
  props.tweet.totalLikes += 1;
}

async function unlikeTweet() {
  await likeApi.unlikeTweet(props.tweet.id);
  props.tweet.liked = false;
  props.tweet.totalLikes -= 1;
}

async function retweetTweet() {
  await retweetApi.retweet(props.tweet.id);
  props.tweet.totalRetweets += 1;
  props.tweet.retweeted = true;
}

async function unretweetTweet() {
  await retweetApi.unretweet(props.tweet.id);
  props.tweet.totalRetweets -= 1;
  props.tweet.retweeted = false;
}
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
    cursor: pointer;
  }
}
</style>
