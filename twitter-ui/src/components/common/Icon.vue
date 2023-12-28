<script setup lang="ts">
import { defineAsyncComponent } from "vue";

interface IconProps {
  name: string;
  fill?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
</script>

<template>
  <component
    class="icon"
    :is="icon"
    :style="{ fill, height: `${sizes[size]}rem` }"
  />
</template>

<style scoped lang="scss">
.icon {
  min-height: 1rem;
}
</style>
