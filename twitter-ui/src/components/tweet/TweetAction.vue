<script setup lang="ts">
import Icon, { type IconName } from "../common/Icon.vue";

interface TweetActionProps {
  icon: IconName;
  active?: boolean;
  activeIcon?: IconName;
  activeColor?: "primary" | "danger" | "success" | "black" | "white";
  text?: string;
}

defineEmits<{
  (e: "action"): Promise<void> | void;
  (e: "activeAction"): Promise<void> | void;
}>();

defineProps<TweetActionProps>();
const ICON_SIZE = 0.93; // TODO: this might just be a set size within icon component
</script>

<template>
  <div class="tweet-action">
    <div v-if="active && !!activeIcon" @click="$emit('activeAction')">
      <Icon
        :name="activeIcon"
        :size="ICON_SIZE"
        :color="active ? activeColor : 'black'"
      />
      <span :class="{ [`${activeColor}`]: active }">{{ text }}</span>
    </div>
    <div v-else @click="$emit('action')">
      <Icon :name="icon" :size="ICON_SIZE" color="black" />
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tweet-action {
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
