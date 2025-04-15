<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchFollowers, fetchFollowing } from "@/api/endpoints";
import * as messagesApi from "@/api/endpoints/messages";
import { useAuthStore } from "@/stores/auth";
import Card from "@/components/common/Card.vue";
import CardHeader from "@/components/common/card/CardHeader.vue";
import CardBody from "@/components/common/card/CardBody.vue";
// import List from "@/components/icons/List.vue";
// import ListItem from "@/components/common/ListItem.vue";
import type { User } from "@/models/User";

const emit = defineEmits<{ (e: "onCreate", threadId: string): void }>();

const authStore = useAuthStore();
const users = ref<User[]>([]);

async function fetchUsers() {
  if (authStore.user?.username) {
    const followers = await fetchFollowers(authStore.user?.username);
    const followig = await fetchFollowing(authStore.user.username);
    users.value = [...followers, ...followig];
  }
}

async function createChatThread(userId: string) {
  const thread = await messagesApi.createChatThread([
    authStore.user?.id!,
    userId,
  ]);
  emit("onCreate", thread.id);
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <Card>
    <CardHeader>New Chat</CardHeader>
    <CardBody>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          @click="createChatThread(user.id)"
        >
          {{ user.username }}
        </li>
      </ul>
    </CardBody>
  </Card>
</template>
