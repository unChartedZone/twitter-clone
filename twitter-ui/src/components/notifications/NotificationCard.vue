<script setup lang="ts">
import AvatarCircle from "@/components/AvatarCircle.vue";
import PostHeader from "../PostHeader.vue";
import { type Notification } from "@/lib/types/models";

interface NotificationCardProps {
  notification: Notification;
}

defineProps<NotificationCardProps>();
</script>

<template>
  <div class="notification">
    <AvatarCircle class="mt-1" :src="notification.initiator.profileImage" />
    <div class="notification__content">
      <PostHeader
        :name="notification.initiator.name"
        :username="notification.initiator.username"
        :createdAt="notification.createdAt"
      />
      <p>
        {{ notification.text }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid $gray;

  &__content {
    flex: 1;
  }
}
</style>
