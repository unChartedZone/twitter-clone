<template>
  <div class="select">
    <label class="select__label">{{ label }}</label>
    <select
      class="select__input"
      @change="(event: any) => handleChange(event.target.value)"
    >
      <option value="" disabled selected></option>
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
export interface Option {
  label: string;
  value: string;
}

type SelectValue = string | number | Option;

interface SelectProps {
  modelValue?: SelectValue;
  label?: string;
  options?: string[] | number[] | Option[];
}

defineProps<SelectProps>();
const emit = defineEmits(["update:modelValue"]);

function handleChange(value: SelectValue) {
  emit("update:modelValue", value);
}
</script>

<style scoped lang="scss">
.select {
  border: 1px solid $gray;
  position: relative;
  display: block;
  width: 100%;

  &__label {
    position: absolute;
  }

  &__input {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    width: 100%;
    padding: 0.5rem;
  }
}
</style>
