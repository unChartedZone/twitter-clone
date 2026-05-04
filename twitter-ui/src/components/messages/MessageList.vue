<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import MessageBubble from "@/components/messages/MessageBubble.vue";
import Modal from "../common/Modal.vue";
import Button from "../common/Button.vue";
import { Card, CardHeader, CardBody, CardFooter } from "../common/card";
import type { ChatMessage } from "@/lib/types/models";
import useChatMessages from "@/lib/hooks/useChatMessages";

const props = defineProps<{ threadId: string; messages: ChatMessage[] }>();
const emit = defineEmits<{
  (e: "deleteMessage", index: number): void;
}>();

const authStore = useAuthStore();
const { deleteMessageMutation } = useChatMessages();

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
  await deleteMessageMutation.mutateAsync({
    chatMessageId: deleteMessageState.messageId,
    chatThreadId: props.threadId,
  });
  closeDeleteModal();
}
</script>

<template>
  <ul class="message-list">
    <MessageBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :isOwner="message.user.id === authStore.user!.id"
      @deleteMessageClicked="(messageId) => initDeleteModal(messageId)"
    />
  </ul>
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
            :loading="deleteMessageMutation.isPending.value"
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
  padding: 0 0.75rem;
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.delete-message {
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 1rem;
}
</style>
