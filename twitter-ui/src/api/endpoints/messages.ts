import type { ChatMessageListResponse } from "@/types/ResponseTypes";
import { authClient } from "../client";
import type { Message } from "@/models/Message";

async function createMessage(threadId: string, body: string) {
  authClient.post(`/messages`, { message: { body } }, { params: { threadId } });
}

async function fetchMessages(
  threadId: string,
  page: number = 1,
): Promise<{ messages: Message[]; hasMore: boolean }> {
  const res = await authClient.get<ChatMessageListResponse>("/messages", {
    params: { threadId, page },
  });
  const messages = res.data.messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return {
    messages,
    hasMore: res.data.meta.links.hasMore,
  };
}

async function deleteMessage(
  messageId: string,
  threadId: string,
): Promise<void> {
  await authClient.delete(`/messages/${messageId}`, {
    params: { threadId },
  });
}

export { fetchMessages, createMessage, deleteMessage };
