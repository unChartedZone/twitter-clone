<script setup lang="ts">
import type { BaseUser } from "@/models/User";

interface FollowerTabProps {
  currentUser?: BaseUser;
}

defineProps<FollowerTabProps>();
</script>

<template>
  <section class="follower-tabs">
    <TabRow>
      <TabHeader :to="`/${currentUser?.username}/followers`">
        Followers
      </TabHeader>
      <TabHeader :to="`/${currentUser?.username}/following`">
        Following
      </TabHeader>
    </TabRow>
  </section>
</template>

<style scoped lang="scss">
.follower-tabs {
  margin-top: 4rem;
}
</style>
