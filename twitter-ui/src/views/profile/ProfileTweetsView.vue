<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useProfileStore } from "@/stores/profile";
import { useIsBottom } from "@/hooks/useIsBottom";
import Tweet from "@/components/Tweet.vue";
import LoadingIcon from "@/components/common/LoadingIcon.vue";
import type { LoadingState } from "@/types/LoadingState";

const profileStore = useProfileStore();
const { isBottom } = useIsBottom();
const loadingState = ref<LoadingState>("idle");

const loadMoreTweets = useDebounceFn(async () => {
  await profileStore.loadProfileTweets();
}, 1000);

onMounted(async () => {
  await profileStore.loadProfileTweets();
  loadingState.value = "resolved";
});

watch(isBottom, async (val, oldVal) => {
  if (val) {
    loadingState.value = "idle";
    await loadMoreTweets();
    loadingState.value = "resolved";
  }
});
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
