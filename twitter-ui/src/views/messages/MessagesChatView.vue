<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import { connectToThread, disconnect } from "@/api/websocket";
import * as messagesApi from "@/api/endpoints/messages";
import Button from "@/components/common/Button.vue";
import Card from "@/components/common/Card.vue";
import CardHeader from "@/components/common/card/CardHeader.vue";
import CardBody from "@/components/common/card/CardBody.vue";
import PageHeader from "@/components/PageHeader.vue";
import MessageBubble from "@/components/messages/MessageBubble.vue";
import Modal from "@/components/common/Modal.vue";
import Textfield from "@/components/common/Textfield.vue";
import { useAuthStore } from "@/stores/auth";
import type { Message } from "@/models/Message";
import type { ChatMessageResponse } from "@/types/ResponseTypes";
import { useChatStore } from "@/stores/chat";

const props = defineProps<{ threadId: string }>();

const authStore = useAuthStore();
const chatStore = useChatStore();
const messages = ref<Message[]>([]);
const newChatText = ref("");
const deleteMessageState = reactive({
  toggleModal: false,
  messageId: "",
});

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
  switch(messagePayload.type) {
    case "message-created": {
      const newMessage = JSON.parse(messagePayload.message) as ChatMessageResponse;
      messages.value.push(newMessage.data.attributes);
    }
    case "message-deleted": {
      const messageId = messagePayload.message
      const index = messages.value.findIndex(m => m.id === messageId)
      if(index !== -1) {
        messages.value.splice(index, 1)
      }
    }
    default: {
      throw new Error("Unsupported message event type")
    }
  }
}

async function fetchMessages(threadId: string) {
  const ms = await messagesApi.fetchMessages(threadId);
  messages.value = [...ms];
}

async function sendMessage() {
  if (!newChatText.value) return;

  await messagesApi.createMessage(props.threadId, newChatText.value);
  newChatText.value = "";
}

function initDeleteModal(messageId: string) {
  deleteMessageState.toggleModal = true;
  deleteMessageState.messageId = messageId;
}

function closeDeleteModal() {
  deleteMessageState.messageId = "";
  deleteMessageState.toggleModal = false;
}

async function deleteMessage() {
  const index = messages.value.findIndex(
    (m) => m.id === deleteMessageState.messageId
  );
  await messagesApi.deleteMessage(deleteMessageState.messageId, props.threadId);
  if (index !== -1) {
    messages.value.splice(index, 1);
  }
  closeDeleteModal();
}
</script>

<template>
  <div class="messages-view">
    <PageHeader :title="chatStore.participant" hideBackButton />
    <div class="chat-container">
      <ul class="messages-list">
        <MessageBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :isOwner="message.user.id === authStore.user!.id"
          @deleteMessageClicked="(messageId) => initDeleteModal(messageId)"
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
  <Modal v-model="deleteMessageState.toggleModal">
    <Card>
      <CardHeader>
        <template #left>
          <Button variant="icon-ghost" size="icon" @click="closeDeleteModal">
            <Icon variant="cross" />
          </Button>
        </template>
        Delete message?
      </CardHeader>
      <CardBody>
        <div class="delete-message">
          <p>This message will be deleted for everyone in this conversation.</p>
          <Button
            variant="destructive"
            secondaryText="Delete"
            size="xl"
            block
            @click="deleteMessage"
          >
            Delete
          </Button>
          <Button variant="outline" size="xl" block @click="closeDeleteModal">
            Cancel
          </Button>
        </div>
      </CardBody>
    </Card>
  </Modal>
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
