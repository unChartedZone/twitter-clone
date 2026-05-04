<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import NoTweetsMessage from "@/components/NoTweetsMessage.vue";
import { useQuery } from "@tanstack/vue-query";
import TweetList from "@/components/profile/TweetList.vue";
import { client } from "@/lib/api/client";

const { data: tweets, isLoading } = useQuery({
  queryKey: ["explore-tweets"],
  queryFn: async () => {
    const res = await client.GET("/tweets/explore");
    return res.data?.tweets;
  },
});
</script>

<template>
  <div>
    <PageHeader title="Explore" />
    <div>
      <NoTweetsMessage v-if="tweets?.length == 0" />
      <TweetList :tweets="tweets" :loading="isLoading" />
    </div>
  </div>
</template>
