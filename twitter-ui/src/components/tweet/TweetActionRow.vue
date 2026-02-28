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
        :text="`${totalRetweets}`"
        activeIcon="retweet"
        :active="retweeted"
        color="success"
        @action="retweetTweet"
        @activeAction="unretweetTweet"
        :size="size"
      />
      <TweetAction
        icon="heart-outline"
        activeIcon="heart"
        :text="`${totalLikes}`"
        :active="liked"
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
        :active="bookmarked"
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
import { ref, watch } from "vue";
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

const bookmarked = ref<boolean>(false);
const liked = ref<boolean>(false);
const retweeted = ref<boolean>(false);
const totalLikes = ref<number>(0);
const totalRetweets = ref<number>(0);

watch(
  () => props.tweet,
  (tweet) => {
    bookmarked.value = tweet.bookmarked;
    liked.value = tweet.liked;
    retweeted.value = tweet.retweeted;
    totalLikes.value = tweet.totalLikes;
    totalRetweets.value = tweet.totalRetweets;
  },
  { immediate: true },
);

async function addBookmark() {
  try {
    await bookmarkApi.bookmarkTweet(props.tweet.id);
    bookmarked.value = true;
  } catch (e) {}
}

async function removeBookmark() {
  try {
    await bookmarkApi.removeBookmarkedTweet(props.tweet.id);
    bookmarked.value = false;
  } catch (e) {}
}

async function likeTweet() {
  await likeApi.likeTweet(props.tweet.id);
  liked.value = true;
  totalLikes.value += 1;
}

async function unlikeTweet() {
  await likeApi.unlikeTweet(props.tweet.id);
  liked.value = false;
  totalLikes.value -= 1;
}

async function retweetTweet() {
  await retweetApi.retweet(props.tweet.id);
  totalRetweets.value += 1;
  retweeted.value = true;
}

async function unretweetTweet() {
  await retweetApi.unretweet(props.tweet.id);
  totalRetweets.value -= 1;
  retweeted.value = false;
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
