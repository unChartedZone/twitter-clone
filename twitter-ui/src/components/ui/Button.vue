<script setup lang="ts">
import LoadingIcon from "../common/LoadingIcon.vue";

// TODO: use this button replace other button
interface ButtonProps {
  variant?:
    | "primary"
    | "outline"
    | "monochrome"
    | "destructive"
    | "icon"
    | "icon-ghost";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm";
  loading?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  type: "button",
  size: "default",
});
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn--${variant}`, `btn--size-${size}`]"
  >
    <div v-if="loading" class="btn__loader">
      <LoadingIcon :size="25" />
    </div>
    <div class="btn__content" :class="[loading && 'loading']">
      <slot />
    </div>
  </button>
</template>

<style scoped lang="scss">
$padding: 0.5rem 1rem;
$rounded: 1.5rem;

.btn {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas: "stack";
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1rem;
  transition: all 0.3s ease-in-out;

  &__content,
  &__loader {
    grid-area: stack;
  }

  .loading {
    visibility: hidden;
  }

  &--primary {
    border-radius: $rounded;
    background-color: $primary;
    color: $white;
    position: relative;
    min-width: 2rem;
    padding: $padding;
    width: 100%;

    &:hover {
      background-color: lighten($primary, 0.4);
    }
  }

  &--monochrome {
    border-radius: $rounded;
    color: $white;
    background-color: $black;
    padding: $padding;

    &:hover {
      background-color: adjust-color($color: $black, $alpha: -0.2);
    }
  }

  &--outline {
    border-style: solid;
    border-width: 1px;
    border-color: $black;
    background-color: $white;
    color: $black;
  }

  &--icon {
    background-color: $black;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    padding: 0.5rem;
    color: $primary;
    fill: $white;

    &:hover {
      background-color: adjust-color($color: $black, $lightness: 20%);
    }
  }

  &--icon-ghost {
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: adjust-color(
        $color: $primary,
        $lightness: 40%,
        $alpha: 0.7
      );
      fill: $primary;
    }
  }

  &--size-icon {
    height: 35px;
    width: 35px;
    padding: 0.5rem;
  }

  &--size-icon-sm {
    height: 30px;
    width: 30px;
    padding: 0.45rem;
  }
}
</style>
