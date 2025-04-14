<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();
</script>

<template>
  <main class="select-message">
    <div>
      <h1>Select a message</h1>
      <p>
        Choose from your existing conversations, start a new one, or just keep
        swimming.
      </p>
      <Button size="xl" @click="chatStore.toggleNewChatModal">
        New message
      </Button>
    </div>
  </main>
</template>

<style scoped lang="scss">
.select-message {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 6rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 800;
  }
}
</style>
