<script setup lang="ts">
import useFollowers from "@/lib/hooks/useFollowers";
import Button from "../common/Button.vue";

interface UnfollowButtonProps {
  userId: string;
}

const props = defineProps<UnfollowButtonProps>();
const { unfollowUserMutation } = useFollowers();

async function unfollowUser() {
  await unfollowUserMutation.mutateAsync(props.userId);
}
</script>

<template>
  <Button
    :loading="unfollowUserMutation.isPending.value"
    variant="destructive"
    secondaryText="Unfollow"
    @click.stop.prevent="unfollowUser"
  >
    Following
  </Button>
</template>
