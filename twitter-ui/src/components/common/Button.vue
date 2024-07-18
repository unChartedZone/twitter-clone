<script setup lang="ts">
import { defineProps } from "vue";
import type { IconName } from "./Icon.vue";
import LoadingIcon from "@/components/common/LoadingIcon.vue";

interface ButtonProps {
  block?: boolean;
  icon?: IconName;
  loading?: boolean;
  // Have button be clear and display a border around button
  outline?: boolean;
  color?: "primary" | "secondary" | string;
  // TODO: add documentation on what this does...
  tonal?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<ButtonProps>(), {
  color: "primary",
  type: "button",
});
</script>

<template>
  <button
    class="btn"
    :class="{
      'btn--block': block,
      'btn--icon': icon,
      'btn--outline': outline,
      'btn--tonal': tonal,
    }"
    :type="type"
  >
    <LoadingIcon v-if="loading" :size="15" />
    <div v-else>
      <Icon v-if="!!icon" :name="icon" :fill="tonal ? 'white' : 'black'" />
      <slot v-else />
    </div>
  </button>
</template>

<style scoped lang="scss">
.btn {
  background-color: $primary;
  border: none;
  border-radius: 1.5rem;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  padding: 0.75rem 1.5rem;

  &:hover {
    // TODO: make this color a variable
    background-color: rgba(26, 145, 218);
  }

  &--block {
    width: 100%;
  }

  &--icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: 0.5rem;

    &:hover {
      background-color: rgba($gray, 0.8);
    }
  }

  &--outline {
    border: 1px solid $gray-200;
    background-color: white;
    color: $black;
    padding: 0.5rem 1.25rem;
    &:hover {
      // TODO: make this color a variable
      background-color: rgba(15, 20, 25, 0.1);
    }
  }

  &--tonal {
    background-color: rgba($black, 0.6);
  }
}
</style>
