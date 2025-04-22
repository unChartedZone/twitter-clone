<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, RouterView } from "vue-router";
import Button from "@/components/common/Button.vue";
import Icon from "@/components/icons/Icon.vue";
import Modal from "@/components/common/Modal.vue";
import NewChatList from "@/components/messages/NewChatList.vue";
import PageHeader from "@/components/PageHeader.vue";
import ChatThreadList from "@/components/messages/ChatThreadList.vue";
import Textfield from "@/components/common/Textfield.vue";
import { useChatStore } from "@/stores/chat";
import useResponsiveView from "@/hooks/useResponsiveView";

const router = useRouter();
const chatStore = useChatStore();
const { isParentRoute } = useResponsiveView("select-chat-view");

onMounted(() => {
  if (chatStore.threads.length === 0) {
    chatStore.fetchThreads();
  }
});

function navigateToThread(threadId: string) {
  router.push(`/messages/${threadId}`);
}
</script>

<template>
  <Modal v-model="chatStore.newChatModal">
    <NewChatList
      @onCreate="(threadId) => navigateToThread(threadId)"
      @onClose="chatStore.toggleNewChatModal"
    />
  </Modal>
  <main class="messages-container">
    <section
      class="thread-container"
      :class="{ 'mobile-hide': !isParentRoute }"
    >
      <PageHeader title="Messages">
        <template #actions>
          <Button
            variant="icon-ghost"
            size="icon"
            @click="chatStore.toggleNewChatModal"
          >
            <Icon variant="message-plus" />
          </Button>
        </template>
      </PageHeader>
      <div class="mx-2">
        <Textfield
          variant="rounded"
          placeholder="Search direct messages"
          icon="magnifying-glass"
        />
      </div>
      <ChatThreadList
        :threads="chatStore.threads"
        @onClick="(threadId) => navigateToThread(threadId)"
      />
    </section>
    <section :class="{ 'mobile-hide': isParentRoute }">
      <router-view />
    </section>
  </main>
</template>

<style scoped lang="scss">
.messages-container {
  display: flex;

  section {
    flex: 1;
  }
}

.thread-container {
  border-right: 1px solid $gray-100;
}
</style>
