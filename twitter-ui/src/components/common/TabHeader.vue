<template>
  <RouterLink v-if="to" :to="to" class="tab-header">
    <slot />
  </RouterLink>
  <li class="tab-header" v-else>
    <slot />
  </li>
</template>

<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from "vue-router";

interface TabHeaderProps {
  to: RouterLinkProps;
}

defineProps<TabHeaderProps>();
</script>

<style scoped lang="scss">
.tab-header {
  display: inline-block;
  cursor: pointer;
  padding: 1rem 2rem;
  flex: 1;
  text-align: center;

  &:hover {
    background-color: $gray;
  }
}
</style>
