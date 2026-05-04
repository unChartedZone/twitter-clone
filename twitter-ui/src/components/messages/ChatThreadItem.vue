<script setup lang="ts">
import ListItem from "../common/ListItem.vue";
import UserCard from "../UserCard.vue";
import type { ChatThread } from "@/lib/types/models";

interface ChatThreadItemProps {
  thread: ChatThread;
}

defineProps<ChatThreadItemProps>();
</script>

<template>
  <ListItem>
    <UserCard v-if="thread.users.length >= 1" :user="thread.users[1]" />
  </ListItem>
</template>
