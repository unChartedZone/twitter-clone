<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";
import Tweet from "@/components/Tweet.vue";

const profileStore = useProfileStore();
</script>

<template>
  <div>
    <ul>
      <Tweet v-for="tweet in profileStore.tweets" :tweet="tweet" />
    </ul>
  </div>
</template>
