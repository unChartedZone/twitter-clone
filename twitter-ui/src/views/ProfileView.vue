<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, RouterView, RouterLink } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import PageHeader from "@/components/PageHeader.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import PageLoader from "@/components/PageLoader.vue";
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
  }
);
</script>

<template>
  <PageLoader v-if="profileStore.isLoadingUser" />
  <main v-else class="profile">
    <PageHeader
      :title="`${profileStore.profileUser?.name}`"
      subtitle="24 tweets"
    />
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
      <RouterView />
    </section>
  </main>
</template>
