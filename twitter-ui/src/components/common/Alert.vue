<script setup lang="ts">
import { watch } from "vue";

interface AlertProps {
  modelValue: boolean;
  color: string;
  delay: number;
}

const props = withDefaults(defineProps<AlertProps>(), {
  color: "primary",
  delay: 3,
});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => props.modelValue,
  (currVal, prevVal) => {
    if (!!currVal) {
      setTimeout(() => {
        emit("update:modelValue", false);
      }, props.delay * 1000);
    }
  }
);
</script>

<template>
  <Transition>
    <div v-if="modelValue" class="alert">
      <slot />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.alert {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  background-color: $primary;
  border-radius: 10px;
  color: $white;
  padding: 0.75rem 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
  transform: translate(-50%, 0);
}

.v-enter-from,
.v-leave-to {
  transform: translate(-50%, 5rem);
}
</style>
