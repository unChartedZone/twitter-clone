<script setup lang="ts">
import AvatarCircle from "../AvatarCircle.vue";
import type Thread from "@/models/Thread";

interface ChatThreadItemProps {
  thread: Thread;
}

defineProps<ChatThreadItemProps>();
</script>

<template>
  <li class="thread">
    <div class="content" v-if="thread.users.length === 1">
      <AvatarCircle :src="thread.users[0].profileImageUrl" />
      <div>
        <h4>{{ thread.users[0].name }}</h4>
        <span>@</span>
        <span>{{ thread.users[0].username }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.thread {
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: $gray-100;
  }

  .content {
    display: flex;
    gap: 0.75rem;
  }
}
</style>
