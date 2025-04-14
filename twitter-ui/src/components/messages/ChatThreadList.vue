<script setup lang="ts">
import type Thread from "@/models/Thread";
import ChatThreadItem from "./ChatThreadItem.vue";

interface ChatThreadListProps {
  threads: Thread[];
}

defineProps<ChatThreadListProps>();
const emit = defineEmits<{ (e: "onClick", threadId: string): void }>();
</script>

<template>
  <ul class="mt-2">
    <ChatThreadItem
      v-for="thread in threads"
      :key="thread.id"
      @click="emit('onClick', thread.id)"
      :thread="thread"
    />
  </ul>
</template>
