<script setup lang="ts">
import type Thread from "@/models/Thread";
import ListItem from "../common/ListItem.vue";
import UserCard from "../UserCard.vue";

interface ChatThreadItemProps {
  thread: Thread;
}

defineProps<ChatThreadItemProps>();
</script>

<template>
  <ListItem>
    <UserCard v-if="thread.users.length === 1" :user="thread.users[0]" />
  </ListItem>
</template>
