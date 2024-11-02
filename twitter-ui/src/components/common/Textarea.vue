<template>
  <div class="textarea" :class="{ 'textarea--borderless': borderless }">
    <textarea
      class="textarea__input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="(event: any) => handleChange(event.target.value)"
    />
    <label class="textarea__label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
interface TextareaProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  borderless?: boolean;
}

defineProps<TextareaProps>();
const emit = defineEmits(["update:modelValue"]);

function handleChange(value: string) {
  emit("update:modelValue", value);
}
</script>

<style scoped lang="scss">
.textarea {
  position: relative;
  border: 1px solid rgba(156, 163, 175, 0.8);
  border-radius: 0.375rem;
  overflow: hidden;
  height: 5rem;

  &--borderless {
    border: none;
  }

  &--borderless &__input {
    padding: 0.5rem;
  }

  &__label {
    position: absolute;
    pointer-events: none;
    top: 30%;
    left: 0.5rem;
    color: rgba(107, 114, 128, 1);
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
  }

  &__input {
    width: 100%;
    min-height: 100%;
    resize: none;
    border: none;
    outline: none;
    padding: 1.5rem 0.55rem 1rem;
    font-family: "Chirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    font-size: 1rem;

    &:focus + label,
    &:not(:placeholder-shown) + label {
      transform: translateY(-110%);
      font-size: 0.85rem;
    }
  }

  &:focus-within {
    border-color: $primary;
    border-width: 2px;
  }
}
</style>
