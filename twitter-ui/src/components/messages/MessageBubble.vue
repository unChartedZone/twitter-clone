<script setup lang="ts">
import { computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Message } from "@/models/Message";

interface MessageBubbleProps {
  message: Message;
  isOwner?: boolean;
}

const props = defineProps<MessageBubbleProps>();
dayjs.extend(relativeTime);

const messageTimestamp = computed(() =>
  dayjs(props.message.createdAt).format("MMMM D, YYYY, hh:mm A")
);
</script>

<template>
  <li class="message" :class="[isOwner ? 'own-message' : 'other-message']">
    <div class="message__content">
      <div class="message__body">
        <span>{{ message.body }}</span>
      </div>
      <div class="message__timestamp">
        <span>{{ messageTimestamp }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.message {
  display: flex;
  font-size: 1rem;
  margin: 0 0 1rem;

  &__body {
    padding: 0.75rem;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &__timestamp {
    font-size: 0.8rem;
    text-align: end;
    margin-top: 0.25rem;
  }
}

.own-message {
  justify-content: flex-end;

  .message__body {
    background-color: $primary;
    color: $white;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 4px;
  }
}

.other-message {
  justify-content: flex-start;

  .message__body {
    background-color: $gray;
  }
}
</style>
