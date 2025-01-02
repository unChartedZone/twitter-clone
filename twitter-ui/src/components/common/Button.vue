<script setup lang="ts">
import LoadingIcon from "@/components/common/LoadingIcon.vue";

interface ButtonProps {
  variant?:
    | "primary"
    | "outline"
    | "monochrome"
    | "destructive"
    | "text"
    | "icon"
    | "icon-ghost"
    | "icon-monochrome";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm";
  secondaryText?: string;
  block?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  type: "button",
  size: "default",
});

defineEmits(["click"]);
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn--${variant}`, `btn--size-${size}`, block && 'btn--block']"
    @click.stop.prevent="$emit('click', $event)"
  >
    <LoadingIcon v-if="loading" class="btn__loader" :size="16" />
    <div class="btn__content" :class="[loading && 'loading']">
      <slot />
      <div class="secondary-content">
        <span>{{ secondaryText }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
$padding: 0.375rem 0.75rem;
$rounded: 1.5rem;

@mixin outline-styling {
  border: 1px solid $gray-200;
  border-radius: $rounded;
  background-color: $white;
  color: $black;
  padding: $padding;
  font-weight: 700;
  font-size: 0.95rem;
}

.btn {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-areas: "stack";
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  font-family: $fonts;
  line-height: 1rem;
  transition: all 0.1s linear;

  &__content,
  &__loader {
    grid-area: stack; // Helps stack button content and loading icon on top of each other
    justify-self: center;
    height: 100%;
    position: relative;
  }

  .loading {
    visibility: hidden;
  }

  .secondary-content {
    position: absolute;
    top: 50%;
    left: 50%;
    visibility: hidden;
    transform: translate(-50%, -50%);
  }

  &--primary {
    border-radius: $rounded;
    background-color: $primary;
    color: $white;
    position: relative;
    min-width: 2rem;
    padding: $padding;

    &:hover {
      background-color: adjust-color($color: $primary, $alpha: -0.2);
    }

    :deep(.lds-ring div) {
      border-color: $white transparent transparent transparent;
    }
  }

  &--monochrome {
    border-radius: $rounded;
    color: $white;
    background-color: $black;
    padding: $padding;

    &:hover {
      background-color: adjust-color($color: $black, $alpha: -0.2);
    }
  }

  &--outline {
    @include outline-styling;

    &:hover {
      background-color: $gray-100;
    }
  }

  &--destructive {
    @include outline-styling;

    &:hover {
      background-color: adjust-color($color: $danger, $alpha: -0.95);
      border-color: $danger;
      color: $danger;
    }
    &:hover .btn__content {
      visibility: hidden;
    }
    &:hover .secondary-content {
      visibility: visible;
    }
  }

  &--text {
    color: $primary;
    background-color: transparent;
    border-radius: $rounded;
    padding: $padding;

    &:hover {
      background-color: $gray-100;
    }
  }

  &--icon {
    background-color: $black;
    border-radius: 50%;
    padding: 0.5rem;
    color: $primary;
    fill: $white;
    line-height: 1rem;
    height: 100%;

    &:hover {
      background-color: adjust-color($color: $black, $lightness: 20%);
    }
  }

  &--icon-ghost {
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    line-height: 1rem;

    &:hover {
      background-color: adjust-color(
        $color: $primary,
        $lightness: 40%,
        $alpha: 0.7
      );
      fill: $primary;
    }
  }

  &--icon-monochrome {
    background-color: adjust-color($color: $black, $alpha: -0.5);
    fill: $white;
    border-radius: 50%;

    &:hover {
      background-color: adjust-color($color: $black, $alpha: -0.6);
    }
  }

  &--size-xl {
    font-size: 1.1rem;
    padding: 1rem;
  }

  &--size-icon {
    height: 35px;
    width: 35px;
    padding: 0.5rem;
  }

  &--size-icon-sm {
    height: 30px;
    width: 30px;
    padding: 0.45rem;
  }

  &--block {
    width: 100%;
  }
}
</style>
