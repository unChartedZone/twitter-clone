<script setup lang="ts">
import { onMounted, ref } from "vue";
import { exploreUserTweets } from "@/api/endpoints/tweets";
import type TweetType from "@/models/Tweet";
import Tweet from "@/components/Tweet.vue";
import NoTweetsMessage from "@/components/NoTweetsMessage.vue";

const tweets = ref<TweetType[]>([]);

onMounted(async () => {
  tweets.value = await exploreUserTweets();
});
</script>

<template>
  <div>
    <div>
      <NoTweetsMessage v-if="tweets.length == 0" />
      <ul>
        <Tweet v-for="tweet in tweets" :tweet="tweet" />
      </ul>
    </div>
  </div>
</template>
