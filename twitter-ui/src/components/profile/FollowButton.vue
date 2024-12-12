<script setup lang="ts">
import { ref } from "vue";
import { followUser } from "@/api/endpoints";
import type { BaseUser } from "@/models/User";
import Button from "../ui/Button.vue";
import type { LoadingState } from "@/types/LoadingState";

interface FollowButtonProps {
  userId: string;
}

const loading = ref<LoadingState>();
const props = defineProps<FollowButtonProps>();
const emit = defineEmits<{
  (e: "onFollow", followedUser: BaseUser): Promise<void>;
}>();

async function follow() {
  loading.value = "idle";
  try {
    const res = await followUser(props.userId);
    const followedUser = res.followed_user;
    emit("onFollow", followedUser);
    loading.value = "resolved";
  } catch (e) {
    loading.value = "rejected";
  }
}
</script>

<template>
  <Button
    :loading="loading === 'idle'"
    variant="monochrome"
    @click.stop.prevent="follow"
  >
    Follow
  </Button>
</template>
