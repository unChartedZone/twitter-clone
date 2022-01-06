<template>
  <button
    class="btn"
    :class="{
      'btn--disabled': disabled,
      'btn--outline': outlined,
      'btn--block': block,
    }"
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
    disabled: {
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
  background-color: #1da1f2;
  @apply py-3;
  @apply px-6;
  @apply rounded-3xl;
  @apply text-white;
  @apply transition-colors;
  @apply outline-none;

  &:hover {
    background-color: rgba(26, 145, 218);
  }

  &--disabled {
    @apply bg-blue-900;
    @apply cursor-not-allowed;
  }

  &--outline {
    @apply border;
    @apply border-blue-500;
    @apply bg-transparent;

    &:hover {
      background-color: rgba(29, 161, 242, 0.1);
    }
  }

  &--block {
    @apply block;
    @apply w-full;
  }
}
</style>
