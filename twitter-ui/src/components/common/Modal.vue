<template>
  <div class="modal">
    <div class="modal__bg" v-if="modelValue" @click="handleClick" />
    <slot name="activator" :onClick="handleClick" />
    <div class="modal__content" v-if="modelValue">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollLock } from "@/hooks/useScrollLock/useScrollLock";
interface ModalProps {
  modelValue?: boolean;
}

const props = defineProps<ModalProps>();
const emit = defineEmits(["update:modelValue"]);

useScrollLock(props);

function handleClick() {
  emit("update:modelValue", !props.modelValue);
}
</script>

<style scoped lang="scss">
.modal {
  position: relative;

  &__bg {
    background-color: rgba($black, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
  }

  &__content {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    z-index: 200;
  }
}
</style>
