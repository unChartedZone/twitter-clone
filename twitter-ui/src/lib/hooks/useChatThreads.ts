import { authClient } from "@/api/client";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { ChatThreadsResponse } from "../types/responses";

export default function useChatThreads() {
  const queryClient = useQueryClient();
  const { data: threads, isLoading } = useQuery({
    queryKey: ["chat-threads"],
    queryFn: async () => {
      const res = await authClient.get<ChatThreadsResponse>("/threads");
      return res.data.threads;
    },
  });

  return {
    threads,
    isLoading,
  };
}
