<script setup lang="ts">
import TweetList from "@/components/profile/TweetList.vue";
import useTweetList from "./useTweetList";

const props = defineProps<{ username: string }>();
const { tweets, isLoading } = useTweetList(() => props.username, "replied");
</script>

<template>
  <div>
    <TweetList :tweets="tweets" :loading="isLoading" />
  </div>
</template>
