<template>
  <div
    class="relative border border-gray-400 rounded-md p-4 focus-within:border-blue-500"
  >
    <label class="textfield__label absolute pointer-events-none">{{ label }}</label>
    <input
      class="textfield__input w-full bg-transparent outline-none"
      :placeholder="placeholder"
      :type="type"
    />
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
      default: '',
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
  &__input:placeholder-shown + &__label {
    color: red !important;
  } 
}

input:placeholder-shown + label {
    color: red;
}
</style>
