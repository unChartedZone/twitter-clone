<template>
  <div
    class="relative border border-gray-400 rounded-md pt-8 px-4 pb-4 focus-within:border-blue-500"
  >
    <input class="textfield__input" :placeholder="placeholder" :type="type" />
    <label class="textfield__label">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    label: {
      default: '',
      type: String,
    },
    placeholder: {
      default: 'This is a textfield.',
      type: String,
    },
    type: {
      default: 'text',
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.textfield {
  &__label {
    @apply absolute;
    @apply pointer-events-none;
    @apply left-4;
    @apply transition-all;

    top: 50%;
    transform: translateY(-50%);
  }

  &__input {
    @apply w-full;
    @apply bg-transparent;
    @apply outline-none;

    &:placeholder-shown + label {
      @apply text-gray-500;
    }

    &:not(:focus) + label {
      @apply text-gray-500;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      @apply text-blue-500;
      transform: translateY(-125%);
      font-size: 0.85rem;
    }

    &::placeholder {
      opacity: 0;
    }
  }
}
</style>
