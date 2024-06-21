<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

// I think this is a good idea...
export type IconName =
  | "balloon"
  | "bell"
  | "bird"
  | "bookmark"
  | "bookmark-outline"
  | "camera-outline"
  | "calendar"
  | "chain"
  | "cross"
  | "ellipsis"
  | "home"
  | "heart"
  | "heart-outline"
  | "left-arrow"
  | "location"
  | "reply"
  | "retweet"
  | "share";

interface IconProps {
  name: IconName;
  fill?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

const props = withDefaults(defineProps<IconProps>(), {
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
    :is="icon"
    :style="{ fill, height: `${computedSize}rem` }"
  />
</template>

<style scoped lang="scss">
.icon {
  min-height: 1rem;
}
</style>
