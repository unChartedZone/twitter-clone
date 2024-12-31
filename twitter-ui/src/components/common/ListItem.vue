<script setup lang="ts">
import type { IconVariant } from "@/types/IconVariants";
import Icon from "../icons/Icon.vue";

defineProps<{ icon?: IconVariant }>();
</script>

<template>
  <li class="list-item">
    <Icon v-if="!!icon" :variant="icon" />
    <slot />
  </li>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 1rem;
  white-space: nowrap;

  &:hover {
    background-color: rgb(247, 249, 249);
  }

  svg {
    height: 1.25rem;
  }
}
</style>
