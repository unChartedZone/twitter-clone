import { useQuery } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { NotificationResponse } from "../types/responses";

export default function useNotifications() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await authClient.get<NotificationResponse>("/notifications");
      return res.data.notifications;
    },
  });

  return { notifications, isLoading };
}
