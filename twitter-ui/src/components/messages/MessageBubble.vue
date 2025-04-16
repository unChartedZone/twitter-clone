<script setup lang="ts">
import { ref, computed } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Message } from "@/models/Message";
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import List from "../common/List.vue";
import ListItem from "../common/ListItem.vue";
import Menu from "../common/Menu.vue";

interface MessageBubbleProps {
  message: Message;
  isOwner?: boolean;
}

const props = defineProps<MessageBubbleProps>();
const emit = defineEmits<{
  (e: "deleteMessageClicked", messageId: string): void;
}>();
dayjs.extend(relativeTime);
const toggleMenu = ref(false);

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
      <div class="message__actions">
        <Menu v-model="toggleMenu">
          <template #activator="{ onClick }">
            <Button variant="icon-ghost" size="icon" @click="onClick">
              <Icon variant="ellipsis" />
            </Button>
          </template>
          <List>
            <ListItem icon="copy-plus">Copy message</ListItem>
            <ListItem
              icon="trash-can"
              @click="emit('deleteMessageClicked', message.id)"
            >
              Delete message
            </ListItem>
          </List>
        </Menu>
      </div>
    </div>
    <div class="message__timestamp">
      <span>{{ messageTimestamp }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin: 0 0 1rem;

  &__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover .message__actions {
      display: initial;
    }
  }

  &__body {
    padding: 0.75rem;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &__actions {
    display: none;
    cursor: pointer;
    color: black;
  }

  &__timestamp {
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
}

.own-message {
  .message__content {
    flex-direction: row-reverse;
  }

  .message__timestamp {
    text-align: end;
  }

  .message__body {
    background-color: $primary;
    color: $white;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 4px;
  }
}

.other-message {
  .message__body {
    background-color: $gray;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 12px;
  }
}
</style>
