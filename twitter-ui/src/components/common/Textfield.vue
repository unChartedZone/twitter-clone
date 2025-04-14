<script setup lang="ts">
import Icon from "../icons/Icon.vue";
import { type IconVariant } from "@/types/IconVariants";

type TextfieldVariant = "default" | "rounded" | "ghost";

interface TextfieldProps {
  modelValue?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  autocomplete?: boolean;
  rounded?: boolean;
  variant?: TextfieldVariant;
  icon?: IconVariant;
}

withDefaults(defineProps<TextfieldProps>(), {
  type: "text",
  variant: "default",
});

const emit = defineEmits(["update:modelValue"]);

function handleChange(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="textfield" :class="[`textfield--${variant}`]">
    <div v-if="!!icon" class="textfield__icon">
      <Icon :variant="icon" />
    </div>
    <input
      class="input"
      :name="name?.toLowerCase() ?? label?.toLowerCase()"
      :placeholder="!!placeholder && !label ? placeholder : ''"
      :type="type"
      :value="modelValue"
      :autocomplete="!autocomplete ? 'off' : 'on'"
      @input="(event: any) => handleChange(event.target.value)"
    />
    <label class="label textfield__label">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
.textfield {
  position: relative;
  border: 1px solid rgba(156, 163, 175, 0.8);
  border-radius: 0.375rem;
  font-family: $fonts;
  overflow: hidden;
  display: flex;
  align-items: center;

  .input {
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 1.25rem 0.55rem 0.5rem;
    width: 100%;
    height: 100%;
  }

  &--default {
    .label {
      position: absolute;
      pointer-events: none;
      top: 50%;
      left: 0.5rem;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
      transform: translateY(-50%);
    }

    .input {
      background-color: $white;

      &:placeholder-shown + label {
        color: rgba(107, 114, 128, 1);
      }

      &:focus + label,
      &:not(:placeholder-shown) + label,
      &:-webkit-autofill + label {
        color: $primary;
        transform: translateY(-110%);
        font-size: 0.85rem;
        padding-bottom: 0.2rem;
      }

      &:not(:focus) + label {
        color: rgba(107, 114, 128, 1);
      }
    }
  }

  &--rounded {
    border-radius: 9999px;

    // Hide dynamic label and just use buitlin placeholder
    .label {
      display: none;
    }

    & .input {
      padding: 0.75rem 1rem;
    }

    & .input::placeholder {
      opacity: 1;
    }
  }

  &--ghost {
    border: none;

    .label {
      display: none;
    }

    .input {
      padding: 0.5rem 0.55rem;
    }
  }

  &__icon {
    margin-left: 0.5rem;
    height: 1rem;
  }

  &:focus-within &__icon {
    fill: $primary;
  }

  &:focus-within {
    border-color: $primary;
  }
}
</style>
