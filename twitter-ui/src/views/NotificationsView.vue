<script setup lang="ts">
import * as notificationApi from "@/api/endpoints/notifications";
import type Notification from "@/models/Notification";
import { useQuery } from "@/hooks/useQuery";
import PageHeader from "@/components/PageHeader.vue";
import PageLoader from "@/components/PageLoader.vue";
import NotificationCard from "@/components/notifications/NotificationCard.vue";

const { result: notifications, loading } = useQuery<Notification[]>(
  notificationApi.fetchNotifications,
  { initialValue: [] }
);
</script>

<template>
  <PageHeader title="Notifications" />
  <PageLoader v-if="loading" />
  <div class="list">
    <NotificationCard
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<style scoped lang="scss">
.list {
  border-top: 1px solid $gray;
}
</style>
