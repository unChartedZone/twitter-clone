<template>
  <button
    class="btn"
    :class="{ 'btn--outline': outlined }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
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
}
</style>
