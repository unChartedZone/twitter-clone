<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, RouterView, RouterLink } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import PageHeader from "@/components/PageHeader.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import TabHeader from "@/components/common/tab/TabHeader.vue";
import TabRow from "@/components/common/tab/TabRow.vue";

const route = useRoute();
const profileStore = useProfileStore();

onMounted(() => {
  const username = route.params.username[0];
  if (username !== profileStore.profileUser?.username) {
    profileStore.$reset();
  }

  if (!!profileStore.profileUser) return;

  profileStore.loadProfileUser(username);
});

watch(
  () => route.params.username[0],
  (u, _u) => {
    profileStore.$reset();
    profileStore.loadProfileUser(u);
    profileStore.loadTweets(u, 1, "default");
  }
);
</script>

<template>
  <PageHeader
    :title="`${profileStore.profileUser?.name}`"
    :subtitle="`${profileStore.profileUser?.totalTweets} tweets`"
    :loading="profileStore.isLoadingUser"
  />
  <main class="profile">
    <PageLoader v-if="profileStore.isLoadingUser" />
    <ProfileHeader
      v-if="profileStore.profileUser"
      :user="profileStore.profileUser"
    />
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
