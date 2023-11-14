<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

interface LinkProps {
  to: string;
  outline?: boolean;
  text?: boolean;
}

withDefaults(defineProps<LinkProps>(), { to: "#" });
</script>

<template>
  <RouterLink
    :to="to"
    class="link"
    :class="{ 'link--outline': outline, 'link--text': text }"
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
  display: inline-block;
  outline: none;
  padding: 0.75rem 1.5rem;
  line-height: 1.25rem;
  text-decoration: none;

  &:hover {
    background-color: rgba(26, 145, 218);
  }

  &--outline {
    background-color: $white;
    border: 1px solid $primary;
    color: $primary;
  }

  &--text {
    background-color: transparent;
    padding: 0;
  }
}
</style>
