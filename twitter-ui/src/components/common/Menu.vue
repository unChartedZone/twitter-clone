<script setup lang="ts">
import { ref } from "vue";

interface MenuProps {
  modelValue?: boolean;
}

const props = defineProps<MenuProps>();
const emit = defineEmits(["update:modelValue"]);

function handleChange() {
  // console.log("Clicked!");
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <div class="menu">
    <slot name="activator" :onClick="handleChange" />
    <div class="menu__content" @click="handleChange" v-if="modelValue">
      <slot />
    </div>
  </div>
  <div v-if="modelValue" class="menu__bg" @click="handleChange" />
</template>

<style scoped lang="scss">
.menu {
  position: relative;

  &__content {
    position: absolute;
    top: -2rem;
    z-index: 200;
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
