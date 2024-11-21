<script setup lang="ts">
import { followUser } from "@/api/endpoints";
import type { BaseUser } from "@/models/User";

interface FollowButtonProps {
  userId: string;
}

const props = defineProps<FollowButtonProps>();
const emit = defineEmits<{
  (e: "onFollow", followedUser: BaseUser): Promise<void>;
}>();

async function follow() {
  const res = await followUser(props.userId);
  const followedUser = res.followed_user;
  emit("onFollow", followedUser);
}
</script>

<template>
  <Button color="black" :size="1" @click="follow">Follow</Button>
</template>
