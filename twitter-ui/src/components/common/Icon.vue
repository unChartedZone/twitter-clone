<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

// I think this is a good idea...
export type IconName =
  | "balloon"
  | "bell"
  | "bell-outline"
  | "bird"
  | "bookmark"
  | "bookmark-outline"
  | "camera-outline"
  | "calendar"
  | "chain"
  | "cross"
  | "ellipsis"
  | "home"
  | "home-outline"
  | "heart"
  | "heart-outline"
  | "left-arrow"
  | "location"
  | "magnify-glass"
  | "magnify-glass-bold"
  | "picture"
  | "profile"
  | "profile-outline"
  | "reply"
  | "retweet"
  | "share";

interface IconProps {
  name: IconName;
  color: "primary" | "danger" | "success" | "black" | "white";
  fill?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

const props = withDefaults(defineProps<IconProps>(), {
  color: "black",
  fill: "black",
  size: "xs",
});

const icon = defineAsyncComponent(
  () => import(`../../assets/svg/${props.name}.svg`)
);

const sizes = {
  xs: 1.5,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

const computedSize = computed(() => {
  return typeof props.size == "number" ? props.size : sizes[props.size];
});
</script>

<template>
  <component
    class="icon"
    :class="[`${color}`]"
    :is="icon"
    :style="{ height: `${computedSize}rem` }"
  />
</template>

<style scoped lang="scss">
.black {
  fill: $black;
}

.primary {
  fill: $primary;
}

.white {
  fill: $white;
}

.danger {
  fill: red;
}

.icon {
  min-height: 1rem;
}
</style>
