<script setup lang="ts">
import { reactive } from "vue";
import type { Message } from "@/models/Message";
import { useAuthStore } from "@/stores/auth";
import * as messagesApi from "@/api/endpoints/messages";
import MessageBubble from "@/components/messages/MessageBubble.vue";
import Modal from "../common/Modal.vue";
import Button from "../common/Button.vue";
import { Card, CardHeader, CardBody, CardFooter } from "../common/card";

const props = defineProps<{ threadId: string; messages: Message[] }>();
const emit = defineEmits<{
  (e: "deleteMessage", index: number): void;
}>();

const authStore = useAuthStore();

const deleteMessageState = reactive({
  toggleModal: false,
  messageId: "",
});

function initDeleteModal(messageId: string) {
  deleteMessageState.toggleModal = true;
  deleteMessageState.messageId = messageId;
}

function closeDeleteModal() {
  deleteMessageState.messageId = "";
  deleteMessageState.toggleModal = false;
}

async function deleteMessage() {
  await messagesApi.deleteMessage(deleteMessageState.messageId, props.threadId);
  closeDeleteModal();
}
</script>

<template>
  <div>
    <ul class="message-list">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :isOwner="message.user.id === authStore.user!.id"
        @deleteMessageClicked="(messageId) => initDeleteModal(messageId)"
      />
    </ul>
  </div>
  <Modal v-model="deleteMessageState.toggleModal">
    <Card>
      <CardHeader>Delete message?</CardHeader>
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
      <CardFooter />
    </Card>
  </Modal>
</template>

<style scoped lang="scss">
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1rem 0;
  margin: 0;
  list-style: none;
}

.delete-message {
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 1rem;
}
</style>
