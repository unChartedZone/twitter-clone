<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchFeed } from "@/api/endpoints";
import type Tweet from "@/models/Tweet";
import TweetVue from "@/components/Tweet.vue";

const tweets = ref<Tweet[]>();

onMounted(async () => {
  tweets.value = await fetchFeed();
});
</script>

<template>
  <div class="home-page">
    <ul>
      <TweetVue v-for="tweet in tweets" :tweet="tweet" />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  height: 110vh;
}
</style>
