<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";

interface LinkProps {
  to?: RouteLocationRaw | string;
  block?: boolean;
  icon?: boolean;
  outline?: boolean;
  text?: boolean;
}

withDefaults(defineProps<LinkProps>(), { to: "/" });
</script>

<template>
  <RouterLink
    :to="to"
    class="link"
    :class="{
      'link--block': block,
      'link--icon': icon,
      'link--outline': outline,
      'link--text': text,
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  background-color: $primary;
  border: none;
  border-radius: $rounded;
  color: white;
  font-weight: 700;
  display: inline-block;
  outline: none;
  padding: 0.75rem 1.5rem;
  line-height: 1.25rem;
  text-decoration: none;

  &:hover {
    background-color: rgba(26, 145, 218);
  }

  &--block {
    display: block;
    width: 100%;
    text-align: center;
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
    background-color: $white;
    border: 1px solid $primary;
    color: $primary;

    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
    }
  }

  &--text {
    background-color: transparent;
    color: $primary;
    font-weight: 500;
    font-size: 1rem;
    padding: 0;

    &:hover {
      text-decoration: underline;
      background: transparent;
    }
  }
}
</style>
