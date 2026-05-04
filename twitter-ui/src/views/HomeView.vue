<script setup lang="ts">
import NoTweetsMessage from "@/components/NoTweetsMessage.vue";
import InlineTweetEditor from "@/components/tweet-editor/InlineTweetEditor.vue";
import TweetList from "@/components/profile/TweetList.vue";
import useHomeFeed from "@/lib/hooks/useHomeFeed";

const { tweets, isLoading } = useHomeFeed();
</script>

<template>
  <div class="home-page">
    <InlineTweetEditor class="inline-tweet-editor" />
    <NoTweetsMessage v-if="tweets?.length == 0" />
    <TweetList class="home-feed" :tweets="tweets" :loading="isLoading" />
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

.home-feed {
  border-top: 1px solid $gray;
}
</style>
