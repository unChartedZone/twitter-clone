<script setup lang="ts">
import type Thread from "@/models/Thread";
import ChatThreadItem from "./ChatThreadItem.vue";
import { RouterLink } from "vue-router";

interface ChatThreadListProps {
  threads: Thread[];
}

defineProps<ChatThreadListProps>();
const emit = defineEmits<{ (e: "onClick", threadId: string): void }>();
</script>

<template>
  <ul class="mt-2">
    <RouterLink
      v-for="thread in threads"
      :key="thread.id"
      :to="`/messages/${thread.id}`"
      v-slot="{ isActive }"
    >
      <ChatThreadItem
        :key="thread.id"
        :thread="thread"
        :class="{ active: isActive }"
      />
    </RouterLink>
  </ul>
</template>

<style scoped lang="scss">
.active {
  border-right: 2px solid $primary;
  background-color: $gray;
}
</style>
