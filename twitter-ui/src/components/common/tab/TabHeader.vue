<template>
  <RouterLink style="flex: 1" v-slot="{ isExactActive }" v-if="to" :to="to">
    <div class="tab-header" :class="{ 'tab-header--active': isExactActive }">
      <slot />
    </div>
  </RouterLink>
  <li class="tab-header" v-else>
    <slot />
  </li>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";

interface TabHeaderProps {
  to: RouteLocationRaw;
}

defineProps<TabHeaderProps>();
</script>

<style scoped lang="scss">
.tab-header {
  cursor: pointer;
  padding: 1rem 2rem;
  flex: 1;
  text-align: center;
  font-weight: 700;

  @include respond(sm) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    background-color: $gray;
  }

  &--active {
    border-bottom: 3px solid $primary;
    border-radius: 2px;
  }
}
</style>
