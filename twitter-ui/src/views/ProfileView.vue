<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import TabHeader from "@/components/common/tab/TabHeader.vue";
import TabRow from "@/components/common/tab/TabRow.vue";
import useProfile from "@/lib/hooks/useProfile";

const props = defineProps<{ username: string }>();
const { user, isLoading } = useProfile(() => props.username);
</script>

<template>
  <PageHeader
    :title="`${user?.name}`"
    :subtitle="`${user?.totalTweets} tweets`"
    :loading="isLoading"
  />
  <main class="profile">
    <PageLoader v-if="isLoading" />
    <ProfileHeader v-if="user" :user="user" />
    <section>
      <TabRow>
        <TabHeader :to="{ name: 'profile' }">Tweets</TabHeader>
        <TabHeader :to="{ name: 'replies' }">Replies</TabHeader>
        <TabHeader :to="{ name: 'media' }">Media</TabHeader>
        <TabHeader :to="{ name: 'likes' }">Likes</TabHeader>
      </TabRow>
    </section>
    <RouterView />
  </main>
</template>
