<script setup lang="ts">
import { ref } from "vue";
import Button from "../common/Button.vue";
import { postUnfollowUser } from "@/api/endpoints";
import type { LoadingState } from "@/types/LoadingState";

interface UnfollowButtonProps {
  userId: string;
}

const props = defineProps<UnfollowButtonProps>();
const emits = defineEmits(["onUnfollow"]);

const loading = ref<LoadingState>();

async function unfollowUser() {
  loading.value = "idle";
  await postUnfollowUser(props.userId);
  emits("onUnfollow", props.userId);
  loading.value = "resolved";
}
</script>

<template>
  <Button
    variant="destructive"
    secondaryText="Unfollow"
    @click.stop.prevent="unfollowUser"
  >
    Following
  </Button>
</template>
