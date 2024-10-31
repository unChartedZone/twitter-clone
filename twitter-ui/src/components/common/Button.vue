<script setup lang="ts">
import { defineProps } from "vue";
import type { IconName } from "./Icon.vue";
import LoadingIcon from "@/components/common/LoadingIcon.vue";

interface ButtonProps {
  // Have button take full width of container
  block?: boolean;
  icon?: IconName;
  loading?: boolean;
  // Have button be clear and display a border around button
  outline?: boolean;
  color?: "primary" | "secondary" | string;
  // TODO: add documentation on what this does...
  size?: number;
  text?: boolean;
  /* Used in conjuction with icon prop, used to make background a see-through black
   */
  tonal?: boolean;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<ButtonProps>(), {
  color: "primary",
  size: 2,
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
      'btn--text': text,
      'btn--tonal': tonal,
      [`${color}`]: color,
    }"
    :style="{
      padding: !!icon
        ? `${size * 0.25}rem`
        : `${size * 0.375}rem ${size * 0.75}rem`,
    }"
    :type="type"
  >
    <LoadingIcon class="loading-icon" v-if="loading" :size="15" />
    <div :class="{ hidden: loading }">
      <Icon v-if="!!icon" :name="icon" :fill="tonal ? 'white' : 'black'" />
      <slot v-else />
    </div>
  </button>
</template>

<style scoped lang="scss">
.primary {
  background-color: $primary;
  color: $white;

  &:hover {
    // TODO: make this color a variable
    background-color: rgba(26, 145, 218);
  }
}

.black {
  background-color: $black;
  color: $white;

  &:hover {
    background-color: lighten($black, 30%);
  }
}

.white {
  background-color: $white;
  color: $black;
}

.loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hidden {
  visibility: hidden;
}

.btn {
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  position: relative;

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

  &--text {
    background-color: transparent;
    color: $primary;

    &:hover {
      background-color: rgba($primary, $alpha: 0.1);
      padding: 0.25rem;
    }
  }

  &--tonal {
    background-color: rgba($black, 0.6);
  }
}
</style>
