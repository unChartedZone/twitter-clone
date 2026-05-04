<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import TweetList from "@/components/profile/TweetList.vue";
import useBookmarks from "@/lib/hooks/useBookmarks";

const { bookmarkedTweets, isLoading } = useBookmarks();
</script>

<template>
  <PageHeader title="Bookmarks" />
  <div>
    <TweetList :tweets="bookmarkedTweets" :loading="isLoading" />
  </div>
</template>
