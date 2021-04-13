<template>
  <button
    class="btn"
    :class="{ 'btn--outline': outlined, 'btn--block': block }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    block: {
      default: false,
      type: Boolean,
    },
    outlined: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<style scoped lang="scss">
.btn {
  @apply bg-blue-500;
  @apply py-3;
  @apply px-6;
  @apply rounded-3xl;
  @apply text-white;

  &--outline {
    @apply border;
    @apply border-blue-500;
    @apply bg-transparent;
  }

  &--block {
    @apply block;
    @apply w-full;
  }
}
</style>
