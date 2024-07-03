<template>
  <div class="select">
    <label class="select__label">{{ label }}</label>
    <select
      class="select__input"
      @change="(event: any) => handleChange(event.target.value)"
    >
      <option
        v-if="modelValue == '' || !modelValue"
        value=""
        disabled
        selected
      ></option>
      <option
        v-for="option in options"
        :value="option"
        :selected="option == modelValue"
      >
        {{ option }}
      </option>
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
  border-radius: 0.375rem;
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;

  &__label {
    position: absolute;
    font-size: 0.8rem;
    top: 10%;
    left: 0.55rem;
  }

  &__input {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    width: 100%;
    padding: 1.5rem 0.55rem 0.55rem;
    font-size: 1rem;
  }
}
</style>
