<script setup lang="ts">
import Icon from "../icons/Icon.vue";
import { type IconVariant } from "@/types/IconVariants";
import { RouterLink } from "vue-router";

interface NavLinkProps {
  to?: string;
  icon: IconVariant;
  activeIcon?: IconVariant;
  text?: string;
}

defineProps<NavLinkProps>();
</script>

<template>
  <li class="nav-link">
    <!-- NavLink is a route  -->
    <RouterLink
      v-if="!!to"
      :to="to"
      v-slot="{ isActive }"
      class="nav-link__container"
    >
      <div class="nav-link__content">
        <div class="nav-link__icon">
          <Icon v-if="isActive && activeIcon" :variant="activeIcon" />
          <Icon v-else :variant="icon" />
        </div>
        <span class="nav-link__text">{{ text }}</span>
      </div>
    </RouterLink>

    <!-- NavLink is a menu to show items  -->
    <div v-else class="nav-link__container">
      <div class="nav-link__content">
        <div class="nav-link__icon">
          <Icon :variant="icon" />
        </div>
        <span class="nav-link__text">{{ text }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.nav-link {
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.7rem;
  padding: 0.25rem 0;
  list-style: none;

  &__container {
    display: inline-block;
    border-radius: 9999px;
    padding: 0.5rem 0;

    &:hover {
      background-color: $gray;
    }

    @include respond(xl) {
      padding: 0.5rem;
    }
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 0.75rem;

    @include respond(xl) {
      padding: 0;
    }
  }

  &__icon {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }

  &__text {
    @include respond(xl) {
      display: none;
    }
  }
}
</style>
