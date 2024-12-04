<script setup lang="ts">
import { fetchBookmarkedTweets } from "@/api/endpoints/bookmarks";
import type Tweet from "@/models/Tweet";
import { useQuery } from "@/hooks/useQuery";
import PageHeader from "@/components/PageHeader.vue";
import TweetList from "@/components/profile/TweetList.vue";

const { result: bookmarkedTweets, loading } = useQuery<Tweet[]>(
  fetchBookmarkedTweets,
  { initialValue: [] }
);
</script>

<template>
  <PageHeader title="Bookmarks" />
  <div>
    <TweetList :tweets="bookmarkedTweets" :loading="loading" />
  </div>
</template>
