import { useQuery } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";

export default function useNotifications() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await client.GET("/notifications");
      return res.data?.notifications;
    },
  });

  return { notifications, isLoading };
}
