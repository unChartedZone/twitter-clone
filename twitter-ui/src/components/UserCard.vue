<script setup lang="ts">
import type { User } from "@/lib/types/models";
import AvatarCircle from "./AvatarCircle.vue";

defineProps<{ user: User }>();
</script>

<template>
  <div class="user-card">
    <AvatarCircle :src="user.profileImage" />
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
