<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  block?: boolean;
  outline?: boolean;
}>();
</script>

<template>
  <button class="btn" :class="{ 'btn--block': block, 'btn--outline': outline }">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  background-color: $primary;
  border: none;
  border-radius: 1.5rem;
  color: white;
  cursor: pointer;
  font-size: 1.15rem;
  outline: none;
  padding: 0.75rem 1.5rem;

  &:hover {
    background-color: rgba(26, 145, 218);
  }

  &--block {
    width: 100%;
  }

  &--outline {
    border: 1px solid $primary;
    background-color: white;
    color: #1d9bf0;

    &:hover {
      background-color: rgba(29, 155, 240, 0.1);
    }
  }
}
</style>
