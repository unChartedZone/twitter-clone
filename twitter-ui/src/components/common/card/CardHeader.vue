<script setup lang="ts">
import { computed, useSlots } from "vue";

const slots = useSlots();
const showLeft = computed(() => !!slots.left);
const showRight = computed(() => !!slots.right);
</script>

<template>
  <div class="card-header">
    <section v-if="showLeft" class="card-header__left">
      <slot name="left" />
    </section>
    <section class="card-header__content">
      <h1>
        <slot />
      </h1>
    </section>
    <section v-if="showRight" class="card-header__right">
      <slot name="right" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0;

  &__content {
    flex: 1;

    h1 {
      font-size: 1.3rem;
      font-weight: 800;
    }
  }

  &__left,
  &__right {
    display: flex;
  }

  &__right {
    justify-content: end;
  }
}
</style>
