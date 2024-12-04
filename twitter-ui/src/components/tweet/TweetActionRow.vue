<template>
  <div class="tweet__actions">
    <div class="main-actions">
      <TweetAction icon="reply" text="0" />
      <TweetAction
        icon="retweet"
        :text="`${tweet.totalRetweets}`"
        :active="tweet.retweeted"
        activeColor="success"
      />
      <TweetAction
        icon="heart-outline"
        activeIcon="heart"
        :text="`${tweet.totalLikes}`"
        :active="tweet.liked"
        activeColor="danger"
      />
    </div>
    <div class="additional-actions">
      <TweetAction
        icon="bookmark-outline"
        activeIcon="bookmark"
        :active="tweet.bookmarked"
        activeColor="primary"
        @action="addBookmark"
        @activeAction="removeBookmark"
      />
      <TweetAction icon="share" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as bookmarkApi from "@/api/endpoints/bookmarks";
import type Tweet from "@/models/Tweet";
import TweetAction from "./TweetAction.vue";

interface TweetActionRowProps {
  tweet: Tweet;
}

const props = defineProps<TweetActionRowProps>();

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
