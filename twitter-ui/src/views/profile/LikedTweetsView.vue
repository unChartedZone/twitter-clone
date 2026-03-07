<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";
import { useProfileTweets } from "@/hooks/useProfileTweets";
import TweetList from "@/components/profile/TweetList.vue";
import useLikes from "@/lib/hooks/useLikes";
import { useRoute } from "vue-router";

const route = useRoute();
const { tweets, isPending } = useLikes(1, route.params.username[0] ?? "");
</script>

<template>
  <div>
    <TweetList :tweets="tweets" :loading="isPending" />
  </div>
</template>
