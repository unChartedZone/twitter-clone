<script setup lang="ts">
import type { User } from "@/models/User";
import Button from "../common/Button.vue";
import useFollowers from "@/lib/hooks/useFollowers";

interface FollowButtonProps {
  userId: string;
}

const props = defineProps<FollowButtonProps>();
const emit = defineEmits<{
  (e: "onFollow", followedUser: User): Promise<void>;
}>();
const { followUserMutation } = useFollowers();

async function follow() {
  await followUserMutation.mutateAsync(props.userId);
}
</script>

<template>
  <Button
    :loading="followUserMutation.isPending.value"
    variant="monochrome"
    @click.stop.prevent="follow"
  >
    Follow
  </Button>
</template>
