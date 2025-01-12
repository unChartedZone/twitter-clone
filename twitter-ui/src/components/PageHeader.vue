<script setup lang="ts">
import Button from "./common/Button.vue";
import Icon from "./icons/Icon.vue";
import LoadingIcon from "./common/LoadingIcon.vue";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  hideBackButton?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<PageHeaderProps>(), {
  title: "",
  subtitle: "",
  hideBackButton: false,
});
</script>

<template>
  <header class="page-header">
    <div class="page-header__content">
      <Button
        v-if="!hideBackButton"
        variant="icon-ghost"
        size="icon"
        @click="$router.go(-1)"
      >
        <Icon variant="left-arrow" />
      </Button>
      <LoadingIcon v-if="loading" />
      <div v-else>
        <h2>{{ title }}</h2>
        <span>{{ subtitle }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-header {
  position: sticky;
  top: 0;
  z-index: 20;
  left: 0;
  backdrop-filter: blur(12px);
  background-color: rgba($white, 0.85);

  @include respond(sm) {
    top: 3rem;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem 0.5rem;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  span {
    font-size: 0.85rem;
    color: $gray-300;
  }
}
</style>
