import type {
  ChatMessageListResponse,
  ChatThreadListResponse,
  ChatThreadResponse,
} from "@/types/ResponseTypes";
import { authClient } from "../client";
import type Thread from "@/models/Thread";
import type { Message } from "@/models/Message";

async function fetchChatThreads(): Promise<Thread[]> {
  const res = await authClient.get<ChatThreadListResponse>("/threads");
  return res.data.data.map((x) => x.attributes);
}

async function createChatThread(userIds: string[]): Promise<Thread> {
  const res = await authClient.post<ChatThreadResponse>("/threads", {
    userIds,
  });
  return res.data.data.attributes;
}

async function createMessage(threadId: string, body: string) {
  authClient.post(`/messages`, { message: { body } }, { params: { threadId } });
}

async function fetchMessages(
  threadId: string,
  page: number = 1
): Promise<{ messages: Message[]; hasMore: boolean }> {
  const res = await authClient.get<ChatMessageListResponse>("/messages", {
    params: { threadId, page },
  });
  const messages = res.data.data
    .map((x) => x.attributes)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return {
    messages,
    hasMore: res.data.links.hasMore,
  };
}

async function deleteMessage(
  messageId: string,
  threadId: string
): Promise<void> {
  await authClient.delete(`/messages/${messageId}`, {
    params: { threadId },
  });
}

export {
  fetchChatThreads,
  createChatThread,
  fetchMessages,
  createMessage,
  deleteMessage,
};
