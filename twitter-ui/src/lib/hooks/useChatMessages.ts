import { computed, type Ref } from "vue";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { ChatMessagesResponse } from "../types/responses";
import type { ChatMessage } from "../types/models";

type ChatMessagesPage = {
  messages: ChatMessage[];
  nextPage: number | null;
  hasMore: boolean;
};

const fetchChatMessages = async (threadId: string, page: number) => {
  const res = await authClient.get<ChatMessagesResponse>("messages", {
    params: { threadId, page },
  });
  return res.data;
};

export default function useChatMessages(threadId: Ref<string>) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["chat-messages", threadId],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await fetchChatMessages(threadId.value, pageParam);
      return {
        messages: [...data.messages].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
        nextPage: data.meta.links.nextPage,
        hasMore: data.meta.links.hasMore,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextPage ?? undefined) : undefined,
  });

  const messages = computed(() =>
    (query.data.value?.pages ?? [])
      .slice()
      .reverse()
      .flatMap((p) => p.messages),
  );

  function appendSocketMessage(message: ChatMessage) {
    queryClient.setQueryData<InfiniteData<ChatMessagesPage>>(
      ["chat-messages", threadId],
      (old) => {
        if (!old || old.pages.length === 0) return old;

        if (old.pages.some((p) => p.messages.some((m) => m.id === message.id)))
          return old;

        const pages = [...old.pages];
        pages[0] = { ...pages[0], messages: [...pages[0].messages, message] };
        return { ...old, pages };
      },
    );
  }

  function removeSocketMessage(messageId: string) {
    queryClient.setQueryData<InfiniteData<ChatMessagesPage>>(
      ["chat-messages", threadId],
      (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((p) => ({
            ...p,
            messages: p.messages.filter((m) => m.id !== messageId),
          })),
        };
      },
    );
  }

  return {
    ...query,
    messages,
    isLoading: query.isLoading,
    appendSocketMessage,
    removeSocketMessage,
  };
}
