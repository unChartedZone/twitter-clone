<script setup lang="ts">
import { ref, onMounted, watch, toRef, nextTick, onBeforeUnmount } from "vue";
import { connectToThread, disconnect } from "@/api/websocket";
import PageHeader from "@/components/PageHeader.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import MessageList from "@/components/messages/MessageList.vue";
import ChatInput from "@/components/messages/ChatInput.vue";
import { useAuthStore } from "@/stores/auth";
import { useChatStore } from "@/stores/chat";
import useChatMessages from "@/lib/hooks/useChatMessages";

const props = defineProps<{ threadId: string }>();
const threadIdRef = toRef(props, "threadId");

const authStore = useAuthStore();
const chatStore = useChatStore();
const container = ref<HTMLElement | null>(null);

const {
  messages,
  isPending,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  appendSocketMessage,
  removeSocketMessage,
} = useChatMessages(threadIdRef);

onMounted(async () => {
  if (!authStore.accessToken) return;
  chatStore.setSelectedThread(props.threadId);
  connectToThread(props.threadId, authStore.accessToken, handleSocketMessage);
});

onBeforeUnmount(() => {
  disconnect();
});

watch(threadIdRef, (threadId, oldThreadId) => {
  if (!authStore.accessToken || threadId === oldThreadId) return;

  disconnect();

  chatStore.setSelectedThread(threadId);
  connectToThread(threadId, authStore.accessToken!, handleSocketMessage);
});

function handleSocketMessage(messagePayload: {
  type: string;
  message: string;
}) {
  switch (messagePayload.type) {
    case "message-created": {
      const parsed = JSON.parse(messagePayload.message);
      appendSocketMessage(parsed.message);
      break;
    }
    case "message-deleted": {
      const messageId = messagePayload.message;
      removeSocketMessage(messagePayload.message);
      break;
    }
    default: {
      throw new Error("Unsupported message event type");
    }
  }
}

async function onScroll() {
  const { scrollTop, scrollHeight, offsetTop, offsetHeight } =
    container.value ?? {
      scrollTop: 0,
      scrollHeight: 0,
      offsetTop: 0,
      offsetHeight: 0,
    };

  const containerHeight = scrollHeight - offsetHeight - offsetTop;

  if (Math.abs(scrollTop) > containerHeight) {
    if (!hasNextPage.value || isFetchingNextPage.value) return;

    await fetchNextPage();
    await nextTick();
  }
}

function scrollToChatEnd() {
  container.value?.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <PageHeader :title="chatStore.participant" hideBackButton />
  <div class="messages-view">
    <div class="chat-container">
      <div class="message-container" ref="container" @scroll="onScroll">
        <PageLoader v-if="isPending" :size="50" />
        <MessageList :threadId="threadId" :messages="messages" />
      </div>
      <ChatInput
        :threadId="props.threadId"
        @scrollToChatEnd="scrollToChatEnd"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.messages-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 2.75rem);
  overflow: hidden;

  @include respond(sm) {
    height: calc(100vh - 8.75rem);
  }
}

.chat-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0; // Important for Firefox to handle overflow correctly
  overflow: hidden;
}

.message-container {
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  overflow-y: auto;
}
</style>
