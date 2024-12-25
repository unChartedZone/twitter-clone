<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, RouterView, RouterLink } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import { useUserProfile } from "@/hooks/useUserProfile";
import PageHeader from "@/components/PageHeader.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import PageLoader from "@/components/PageLoader.vue";

const profileStore = useProfileStore();
const route = useRoute();
const {
  currentUser,
  fetchUserProfile,
  loading: profileLoading,
} = useUserProfile(route.params.username[0]);

onMounted(() => {
  if (
    profileStore.username !== route.params.username[0] &&
    profileStore.username !== ""
  ) {
    profileStore.$reset();
    return;
  }

  profileStore.setUsername(route.params.username[0]);
});

// Watch for route change and refresh profile user
watch(
  () => route.params.username,
  async (value, oldValue) => {
    if (value[0] === oldValue[0]) return;
    profileStore.$reset();
    await fetchUserProfile(value[0]);
  }
);
</script>

<template>
  <main class="profile">
    <PageHeader
      v-if="!!currentUser"
      :title="`${currentUser?.name}`"
      :subtitle="`${currentUser?.totalTweets} tweets`"
    />
    <PageLoader v-if="profileLoading === 'idle' && !currentUser" />
    <div v-else>
      <ProfileHeader :user="currentUser!" />
    </div>
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
