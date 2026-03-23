<script setup lang="ts">
import { ref } from "vue";
import Textfield from "../common/Textfield.vue";
import Button from "../common/Button.vue";
import useChatMessages from "@/lib/hooks/useChatMessages";

const emit = defineEmits<{ (e: "scrollToChatEnd"): void }>();
const props = defineProps<{ threadId: string }>();

const newChatText = ref("");
const { createMessageMutation } = useChatMessages();

async function sendMessage(event: Event) {
  event.preventDefault();
  if (!newChatText.value) return;

  await createMessageMutation.mutateAsync({
    chatThreadId: props.threadId,
    body: newChatText.value,
  });
  newChatText.value = "";
  emit("scrollToChatEnd");
}
</script>

<template>
  <form @submit="sendMessage">
    <div class="chat-field">
      <Textfield
        v-model="newChatText"
        variant="rounded"
        placeholder="Start a new message"
      />
      <Button :loading="createMessageMutation.isPending.value" type="submit">
        Send
      </Button>
    </div>
  </form>
</template>

<style scoped lang="scss">
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
</style>
