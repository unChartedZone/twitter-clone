<script setup lang="ts">
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import { type IconVariant } from "@/types/IconVariants";

interface TweetActionProps {
  icon: IconVariant;
  active?: boolean;
  activeIcon?: IconVariant;
  color?: "primary" | "danger" | "success" | "black" | "white";
  text?: string;
  size: "icon" | "icon-sm";
}

defineEmits<{
  (e: "action"): Promise<void> | void;
  (e: "activeAction"): Promise<void> | void;
}>();

withDefaults(defineProps<TweetActionProps>(), {
  color: "primary",
  size: "icon",
});
</script>

<template>
  <div
    class="tweet-action"
    :class="[`color-${color}`, !!active && `active-color-${color}`]"
  >
    <Button
      variant="icon-ghost"
      :size="size"
      @click.stop.prevent="active ? $emit('activeAction') : $emit('action')"
    >
      <Icon :variant="active && activeIcon ? activeIcon : icon" />
    </Button>
    <span v-if="!!text">{{ text }}</span>
  </div>
</template>

<style scoped lang="scss">
.tweet-action {
  display: flex;
  align-items: center;
}

$color-list: (
  primary: $primary,
  danger: $danger,
  success: $success,
);

@each $key, $val in $color-list {
  .color-#{$key} {
    &:hover {
      color: $val;
      transition: color 0.3s ease-in-out;

      button {
        fill: #{$val};
        background-color: adjust-color($color: $val, $alpha: -0.8);
      }
    }
  }

  .active-color-#{$key} {
    color: $val;
    fill: $val;
  }
}
</style>
