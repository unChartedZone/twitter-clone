<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import { connectToThread, disconnect } from "@/api/websocket";
import * as messagesApi from "@/api/endpoints/messages";
import PageHeader from "@/components/PageHeader.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import MessageList from "@/components/messages/MessageList.vue";
import ChatInput from "@/components/messages/ChatInput.vue";
import { useAuthStore } from "@/stores/auth";
import type { Message } from "@/models/Message";
import type { ChatMessageResponse } from "@/types/ResponseTypes";
import { useChatStore } from "@/stores/chat";
import type { LoadingState } from "@/types/LoadingState";

const props = defineProps<{ threadId: string }>();

const authStore = useAuthStore();
const chatStore = useChatStore();
const messages = ref<Message[]>([]);
const messagesLoading = ref<LoadingState>("idle");

onMounted(async () => {
  if (!authStore.accessToken) return;

  await fetchMessages(props.threadId);
  chatStore.setSelectedThread(props.threadId);
  connectToThread(props.threadId, authStore.accessToken, handleSocketMessage);
});

onBeforeUnmount(() => {
  disconnect();
});

watch(
  () => props.threadId,
  (threadId, _oldThreadId) => {
    disconnect();
    messages.value = [];
    chatStore.setSelectedThread(threadId);
    connectToThread(threadId, authStore.accessToken!, handleSocketMessage);
    fetchMessages(threadId);
  }
);

function handleSocketMessage(messagePayload: {
  type: string;
  message: string;
}) {
  switch (messagePayload.type) {
    case "message-created": {
      const newMessage = JSON.parse(
        messagePayload.message
      ) as ChatMessageResponse;
      messages.value.push(newMessage.data.attributes);
      break;
    }
    case "message-deleted": {
      const messageId = messagePayload.message;
      const index = messages.value.findIndex((m) => m.id === messageId);
      if (index !== -1) {
        messages.value.splice(index, 1);
      }
      break;
    }
    default: {
      throw new Error("Unsupported message event type");
    }
  }
}

async function fetchMessages(threadId: string) {
  messagesLoading.value = "idle";
  try {
    const ms = await messagesApi.fetchMessages(threadId);
    messages.value = [...ms];
    messagesLoading.value = "resolved";
  } catch (err) {
    messagesLoading.value = "rejected";
  }
}
</script>

<template>
  <div class="messages-view">
    <PageHeader :title="chatStore.participant" hideBackButton />
    <div class="chat-container">
      <div class="message-container">
        <PageLoader v-if="messagesLoading === 'idle'" />
        <MessageList v-else :threadId="threadId" :messages="messages" />
      </div>
      <ChatInput :threadId="props.threadId" />
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

.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin: 0;
}
</style>
