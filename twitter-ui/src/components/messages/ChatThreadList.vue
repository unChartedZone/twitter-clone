<script setup lang="ts">
import ChatThreadItem from "./ChatThreadItem.vue";
import { RouterLink } from "vue-router";
import type { ChatThread } from "@/lib/types/models";

interface ChatThreadListProps {
  threads: ChatThread[];
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
