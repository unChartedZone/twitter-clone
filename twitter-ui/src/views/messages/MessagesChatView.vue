<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { connectToThread, disconnect } from "@/api/websocket";
import * as messagesApi from "@/api/endpoints/messages";
import Button from "@/components/common/Button.vue";
import PageHeader from "@/components/PageHeader.vue";
import MessageBubble from "@/components/messages/MessageBubble.vue";
import Textfield from "@/components/common/Textfield.vue";
import { useAuthStore } from "@/stores/auth";
import type { Message } from "@/models/Message";
import type { ChatMessageResponse } from "@/types/ResponseTypes";

const authStore = useAuthStore();
const route = useRoute();
const messages = ref<Message[]>([]);
const newChatText = ref("");

onMounted(async () => {
  if (!authStore.accessToken) return;

  const threadId = route.params.threadId as string;

  await fetchMessages(threadId);

  connectToThread(
    threadId,
    authStore.accessToken,
    (messagePayload: { message: string }) => {
      const newMessage = JSON.parse(
        messagePayload.message
      ) as ChatMessageResponse;
      messages.value.push(newMessage.data.attributes);
    }
  );
});

onBeforeUnmount(() => {
  disconnect();
});

async function fetchMessages(threadId: string) {
  const ms = await messagesApi.fetchMessages(threadId);
  messages.value = [...ms];
}

async function sendMessage() {
  if (!newChatText.value) return;

  const threadId = route.params.threadId as string;
  await messagesApi.createMessage(threadId, newChatText.value);
  newChatText.value = "";
}
</script>

<template>
  <div class="messages-view">
    <PageHeader title="Thread" />
    <div class="chat-container">
      <ul class="messages-list">
        <MessageBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :isOwner="message.user.id === authStore.user!.id"
        />
      </ul>
      <div class="chat-field">
        <Textfield
          v-model="newChatText"
          variant="rounded"
          placeholder="Start a new message"
        />
        <Button @click="sendMessage">Send</Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.messages-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; // Important for Firefox to handle overflow correctly
  overflow: hidden;
}

.chat-field {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  background-color: var($gray-100);
  border-top: 1px solid $gray-200;

  .textfield {
    flex: 1;
  }
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin: 0;
  list-style: none;
}
</style>
