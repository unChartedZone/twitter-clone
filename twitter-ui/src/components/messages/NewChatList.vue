<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import { Card, CardHeader, CardBody } from "@/components/common/card";
import ListItem from "@/components/common/ListItem.vue";
import UserCard from "../UserCard.vue";
import Textfield from "../common/Textfield.vue";
import { authClient } from "@/api/client";
import type {
  CreateChatThreadResponse,
  UsersResponse,
} from "@/lib/types/responses";
import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";

const emit = defineEmits<{
  (e: "onCreate", threadId: string): void;
  (e: "onClose"): void;
}>();

const authStore = useAuthStore();
const queryClient = useQueryClient();
const searchText = ref("");

const { data: users, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await authClient.get<UsersResponse>("/users/summary");
    return res.data.users;
  },
});

const filteredUsers = computed(() => {
  if (isLoading.value || !users.value) return [];
  if (searchText.value === "") return [...users.value];

  return users.value.filter((user) => {
    return user.name.toLowerCase().includes(searchText.value.toLowerCase());
  });
});

const createChatThreadMutation = useMutation({
  mutationFn: async ({ userIds }: { userIds: string[] }) => {
    const res = await authClient.post<CreateChatThreadResponse>("/threads", {
      userIds,
    });
    return res.data.thread;
  },
  onSuccess: (thread) => {
    queryClient.invalidateQueries({ queryKey: ["chat-threads"] });
    emit("onCreate", thread.id);
    emit("onClose");
  },
});

async function createChatThread(userId: string) {
  if (!authStore.user) return;

  createChatThreadMutation.mutateAsync({
    userIds: [authStore.user?.id, userId],
  });
}
</script>

<template>
  <Card style="height: 85vh">
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
          v-model="searchText"
          variant="ghost"
          placeholder="Search people"
          icon="magnifying-glass"
        />
      </div>
    </CardBody>
    <ul class="user-list">
      <ListItem
        v-for="user in filteredUsers"
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
