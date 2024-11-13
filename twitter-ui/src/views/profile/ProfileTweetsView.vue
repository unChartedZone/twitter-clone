<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { useProfileStore } from "@/stores/profile";
import { useIsBottom } from "@/hooks/useIsBottom";
import Tweet from "@/components/Tweet.vue";
import LoadingIcon from "@/components/common/LoadingIcon.vue";
import type { LoadingState } from "@/types/LoadingState";

const route = useRoute();
const username = route.params["username"][0];
const profileStore = useProfileStore();
const { isBottom } = useIsBottom();
const loadingState = ref<LoadingState>("idle");

const fetchProfileTweets = useDebounceFn(async () => {
  await profileStore.loadProfileTweets(username);
}, 300);

onMounted(async () => {
  // User has navigated to a completely 'new' profile page, so a refresh needs
  // to be done
  if (profileStore.currentUsername !== username) {
    profileStore.$reset();
  }

  if (profileStore.tweets.length == 0) {
    await fetchProfileTweets();
  }
  loadingState.value = "resolved";
});

// For when a user scrolls to the bottom of a page
watch(isBottom, async (val, oldVal) => {
  if (val) {
    loadingState.value = "idle";
    await fetchProfileTweets();
    loadingState.value = "resolved";
  }
});

// Used for when navigation between one user profile page and another, this
// wouldn't cause a remounting of profile tweets view
watch(
  () => route.params.username,
  async (user, oldUsername) => {
    profileStore.$reset();
    profileStore.loadProfileTweets(user[0]);
  }
);
</script>

<template>
  <div>
    <ul>
      <Tweet v-for="tweet in profileStore.tweets" :tweet="tweet" />
    </ul>
    <div v-if="loadingState == 'idle'" class="loading-icon">
      <LoadingIcon />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-icon {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
