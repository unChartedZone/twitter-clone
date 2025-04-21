<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as userSumaryApi from "@/api/endpoints/userSummary";
import * as messagesApi from "@/api/endpoints/messages";
import { useAuthStore } from "@/stores/auth";
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import { Card, CardHeader, CardBody } from "@/components/common/card";
import ListItem from "@/components/common/ListItem.vue";
import UserCard from "../UserCard.vue";
import Textfield from "../common/Textfield.vue";
import type { UserSummary } from "@/models/User";
import { useChatStore } from "@/stores/chat";

const emit = defineEmits<{
  (e: "onCreate", threadId: string): void;
  (e: "onClose"): void;
}>();

const authStore = useAuthStore();
const chatStore = useChatStore();
const users = ref<UserSummary[]>([]);

async function fetchUsers() {
  if (authStore.user?.username) {
    users.value = await userSumaryApi.fetchUserSummaries();
  }
}

async function createChatThread(userId: string) {
  if (!authStore.user) return;

  const thread = await messagesApi.createChatThread([
    authStore.user?.id,
    userId,
  ]);
  chatStore.addThread(thread);
  emit("onCreate", thread.id);
  emit("onClose");
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <Card>
    <CardHeader>
      <template #left>
        <Button variant="icon-ghost" size="icon" @click="emit('onClose')">
          <Icon variant="cross" />
        </Button>
      </template>
      New Chat
    </CardHeader>
    <CardBody>
      <div>
        <Textfield
          variant="ghost"
          placeholder="Search people"
          icon="magnifying-glass"
        />
      </div>
    </CardBody>
    <ul class="user-list">
      <ListItem
        v-for="user in users"
        :key="user.id"
        @click="createChatThread(user.id)"
      >
        <UserCard :user="user" />
      </ListItem>
    </ul>
  </Card>
</template>

<style scoped lang="scss">
.user-list {
  padding: 0 0.5rem;
  border-top: 1px solid $gray-200;
}
</style>
