<script setup lang="ts">
interface TextfieldProps {
  modelValue?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  autocomplete?: boolean;
}

withDefaults(defineProps<TextfieldProps>(), {
  type: "text",
});

const emit = defineEmits(["update:modelValue"]);

function handleChange(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="textfield">
    <input
      class="textfield__input"
      :name="name?.toLowerCase() ?? label?.toLowerCase()"
      :placeholder="placeholder ? placeholder : label"
      :type="type"
      :value="modelValue"
      @input="(event: any) => handleChange(event.target.value)"
      :autocomplete="!autocomplete ? 'off' : 'on'"
    />
    <label class="textfield__label">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
.textfield {
  position: relative;
  border: 1px solid rgba(156, 163, 175, 0.8);
  border-radius: 0.375rem;
  overflow: hidden;

  &:focus-within {
    border-color: $primary;
  }

  &__label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 0.5rem;
    transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
    transform: translateY(-50%);
  }

  &__input {
    width: 100%;
    height: 100%;
    background-color: $white;
    border: none;
    outline: none;
    padding: 1.5rem 0.55rem 1rem;
    font-size: 1rem;

    &:placeholder-shown + label {
      color: rgba(107, 114, 128, 1);
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      color: $primary;
      transform: translateY(-125%);
      font-size: 0.85rem;
      padding-bottom: 0.2rem;
    }

    &:not(:focus) + label {
      color: rgba(107, 114, 128, 1);
    }

    &::placeholder {
      opacity: 0;
    }
  }
}
</style>
