import { client } from "@/lib/api/client";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

export default function useChatThreads() {
  const queryClient = useQueryClient();
  const { data: threads, isLoading } = useQuery({
    queryKey: ["chat-threads"],
    queryFn: async () => {
      const res = await client.GET("/threads");
      return res.data?.threads;
    },
  });

  return {
    threads,
    isLoading,
  };
}
