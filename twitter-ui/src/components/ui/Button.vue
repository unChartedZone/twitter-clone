<script setup lang="ts">
// TODO: use this button replace other button
interface ButtonProps {
  variant?:
    | "primary"
    | "outline"
    | "destructive"
    | "icon"
    | "icon-ghost";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm";
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
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1rem;

  &--primary {
    border-radius: 1.5rem;
    background-color: $primary;
    color: $white;
    position: relative;
    min-width: 2rem;
    padding: 0.5rem 1rem;
    width: 100%;

    &:hover {
      background-color: lighten($primary, 0.4);
    }
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
