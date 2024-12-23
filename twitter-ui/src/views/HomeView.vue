<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchFeed } from "@/api/endpoints/tweets";
import type Tweet from "@/models/Tweet";
import TweetVue from "@/components/Tweet.vue";
import NoTweetsMessage from "@/components/NoTweetsMessage.vue";
import InlineTweetEditor from "@/components/tweet-editor/InlineTweetEditor.vue";

const tweets = ref<Tweet[]>();

onMounted(async () => {
  tweets.value = await fetchFeed();
});
</script>

<template>
  <div class="home-page">
    <InlineTweetEditor class="inline-tweet-editor" />
    <NoTweetsMessage v-if="tweets?.length == 0" />
    <ul class="tweet-list">
      <TweetVue v-for="tweet in tweets" :tweet="tweet" />
    </ul>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  height: 110vh;
}

.inline-tweet-editor {
  @include respond(sm) {
    display: none;
  }
}

.tweet-list {
  border-top: 1px solid $gray;
}
</style>
