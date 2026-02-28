<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import NotificationCard from "@/components/notifications/NotificationCard.vue";
import useNotifications from "@/lib/hooks/useNotifications";

const { notifications, isLoading } = useNotifications();
</script>

<template>
  <PageHeader title="Notifications" />
  <PageLoader v-if="isLoading" />
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
