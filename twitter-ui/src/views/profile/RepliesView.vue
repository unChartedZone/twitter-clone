<script setup lang="ts">
import TweetList from "@/components/profile/TweetList.vue";
import { useRoute } from "vue-router";
import useRetweets from "@/lib/hooks/useRetweets";

const route = useRoute();
const { tweets, isLoading } = useRetweets(route.params.username[0] ?? "", 1);
</script>

<template>
  <div>
    <TweetList :tweets="tweets" :loading="isLoading" />
  </div>
</template>
