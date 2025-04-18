import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Thread from "@/models/Thread";
import * as messagesApi from "@/api/endpoints/messages";

export const useChatStore = defineStore("chat", () => {
  const newChatModal = ref(false);
  const threads = ref<Thread[]>([]);
  const selectedThread = ref<Thread>();

  const participant = computed<string>(() => {
    if (!selectedThread.value) return "";

    if (selectedThread.value.users.length === 1) {
      const user = selectedThread.value.users[0];
      return user.name;
    }

    return "";
  });

  async function fetchThreads() {
    const ts = await messagesApi.fetchChatThreads();
    threads.value = [...ts];
  }

  function addThread(thread: Thread) {
    threads.value.push(thread);
  }

  function setSelectedThread(threadId: string) {
    const t = threads.value.find((t) => t.id === threadId);
    selectedThread.value = t;
  }

  function toggleNewChatModal() {
    newChatModal.value = !newChatModal.value;
  }

  return {
    newChatModal,
    threads,
    selectedThread,
    participant,
    addThread,
    setSelectedThread,
    toggleNewChatModal,
    fetchThreads,
  };
});
