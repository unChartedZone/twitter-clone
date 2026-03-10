<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, toRef, nextTick } from "vue";
import { useScroll } from "@vueuse/core";
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
const listRef = ref<HTMLElement | null>(null);
const listEnd = ref<HTMLElement | null>(null);
const didInitialScroll = ref(false);
const { arrivedState } = useScroll(listRef);

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
  listEnd.value?.scrollIntoView({ behavior: "smooth" });
});

onBeforeUnmount(() => {
  disconnect();
});

watch(threadIdRef, (threadId, oldThreadId) => {
  if (!authStore.accessToken || threadId === oldThreadId) return;

  disconnect();

  didInitialScroll.value = false;
  chatStore.setSelectedThread(threadId);
  connectToThread(threadId, authStore.accessToken!, handleSocketMessage);
  listEnd.value?.scrollIntoView({ behavior: "smooth", block: "end" });
});

watch(
  () => arrivedState.top,
  async (top) => {
    if (!top || !hasNextPage.value || isFetchingNextPage.value) return;
    const el = listRef.value;
    if (!el) return;

    // preserve viewport when older messages are prepended
    const prevHeight = el.scrollHeight;
    const prevTop = el.scrollTop;

    await fetchNextPage();
    await nextTick();
  },
);

watch(
  () => messages.value.length,
  async (len, prevLen) => {
    if (!len) return;

    // first load (or thread switch): jump to bottom
    if (!didInitialScroll.value) {
      didInitialScroll.value = true;
      await nextTick();
      listEnd.value?.scrollIntoView({ behavior: "smooth", block: "end" });
      return;
    }

    if (len > prevLen && arrivedState.bottom) {
      await nextTick();
      listEnd.value?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  },
);

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
</script>

<template>
  <PageHeader :title="chatStore.participant" hideBackButton />
  <div class="messages-view">
    <div class="chat-container">
      <div class="message-container" ref="listRef">
        <PageLoader v-if="isPending" />
        <MessageList :threadId="threadId" :messages="messages" />
        <div
          ref="listEnd"
          style="height: 1rem; width: 100%; border: 1px solid red"
        />
      </div>
      <ChatInput :threadId="props.threadId" />
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
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}
</style>
