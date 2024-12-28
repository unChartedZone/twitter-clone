<script setup lang="ts">
import { RouterLink } from "vue-router";
import Icon from "../icons/Icon.vue";
import type { IconVariant } from "@/types/IconVariants";

interface SettingsLinkProps {
  to: string;
  title: string;
  subtitle?: string;
  icon?: IconVariant;
}

defineProps<SettingsLinkProps>();
</script>

<template>
  <RouterLink class="link" :to="to">
    <Icon v-if="!!icon" :variant="icon" />
    <div class="link__content">
      <h4>{{ title }}</h4>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <Icon variant="chevron-right" />
  </RouterLink>
</template>

<style scoped lang="scss">
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0.75rem;
  border-bottom: 1px solid $gray-100;

  &:hover {
    background-color: $gray-100;
  }

  &:first-of-type {
    border-top: 1px solid $gray-100;
  }

  &__content {
    flex: 1;
  }

  svg {
    height: 1.15rem;
    fill: $gray-300;
  }
}

.subtitle {
  color: $gray-300;
  font-size: 13px;
}
</style>
