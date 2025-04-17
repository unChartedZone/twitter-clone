<script setup lang="ts">
import type { UserSummary } from "@/models/User";
import AvatarCircle from "./AvatarCircle.vue";

defineProps<{ user: UserSummary }>();
</script>

<template>
  <div class="user-card">
    <AvatarCircle :src="user.profileImageUrl" />
    <div>
      <h4>{{ user.name }}</h4>
      <span>@</span>
      <span>{{ user.username }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-card {
  display: flex;
  gap: 0.75rem;
}
</style>
