<script setup lang="ts">
import { ref } from "vue";
import * as messagesApi from "@/api/endpoints/messages";
import Textfield from "../common/Textfield.vue";
import Button from "../common/Button.vue";

const props = defineProps<{ threadId: string }>();

const newChatText = ref("");

async function sendMessage() {
  if (!newChatText.value) return;

  await messagesApi.createMessage(props.threadId, newChatText.value);
  newChatText.value = "";
}
</script>

<template>
  <div class="chat-field">
    <Textfield
      v-model="newChatText"
      variant="rounded"
      placeholder="Start a new message"
    />
    <Button @click="sendMessage">Send</Button>
  </div>
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
