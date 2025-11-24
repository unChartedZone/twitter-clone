import type Notification from "@/models/Notification";
import type { NotificationListResponse } from "@/types/ResponseTypes";
import { authClient } from "../client";

export async function fetchNotifications(): Promise<Notification[]> {
  const res = await authClient.get<NotificationListResponse>("/notifications");
  return res.data.notifications;
}
