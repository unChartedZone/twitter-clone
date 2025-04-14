<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as messagesApi from "@/api/endpoints/messages";
import Button from "@/components/common/Button.vue";
import Icon from "@/components/icons/Icon.vue";
import Modal from "@/components/common/Modal.vue";
import NewChatList from "@/components/messages/NewChatList.vue";
import PageHeader from "@/components/PageHeader.vue";
import ChatThreadList from "@/components/messages/ChatThreadList.vue";
import Textfield from "@/components/common/Textfield.vue";
import type Thread from "@/models/Thread";

const router = useRouter();
const newChatModal = ref(false);
const threads = ref<Thread[]>([]);

onMounted(async () => {
  const ts = await messagesApi.fetchChatThreads();
  threads.value = [...ts];
});

function navigateToThread(threadId: string) {
  router.push(`/messages/${threadId}`);
}
</script>

<template>
  <PageHeader title="Messages">
    <template #actions>
      <Button variant="icon-ghost" size="icon" @click="newChatModal = true">
        <Icon variant="message-plus" />
      </Button>
    </template>
  </PageHeader>
  <Modal v-model="newChatModal">
    <NewChatList @onCreate="(threadId) => navigateToThread(threadId)" />
  </Modal>
  <div class="mx-2">
    <Textfield
      variant="rounded"
      placeholder="Search direct messages"
      icon="magnifying-glass"
    />
  </div>
  <ChatThreadList
    :threads="threads"
    @onClick="(threadId) => navigateToThread(threadId)"
  />
</template>

<style scoped lang="scss"></style>
