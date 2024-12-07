<script setup lang="ts">
// TODO: use this button replace other button
interface ButtonProps {
  variant?: "primary" | "outline" | "destructive" | "icon";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon";
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  type: "button",
  size: "default",
});
</script>

<template>
  <button :type="type" class="btn" :class="[`btn--${variant}`]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  font-size: 1rem;
  line-height: 1rem;

  &--primary {
    outline: none;
    border: none;
    border-radius: 1.5rem;
    background-color: $primary;
    color: $white;
    position: relative;
    font-weight: 700;
    min-width: 2rem;
    padding: 0.5rem;
    width: 100%;
  }

  &--outline {
    border-style: solid;
    border-width: 1px;
    border-color: $black;
    background-color: $white;
    color: $black;
  }

  &--icon {
    border: none;
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
}
</style>
