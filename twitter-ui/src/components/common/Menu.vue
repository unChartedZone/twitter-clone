<script setup lang="ts">
import { ref, watch } from "vue";

interface MenuProps {
  modelValue?: boolean;
}

const props = defineProps<MenuProps>();
const emit = defineEmits(["update:modelValue"]);
const target = ref<HTMLElement | null>(null);
const displaceContent = ref<boolean>(false);

function handleChange() {
  displaceContent.value = false;
  emit("update:modelValue", !props.modelValue);
}

watch(
  () => [props.modelValue, target.value],
  (val, _oldVal) => {
    if (!val) return;

    if (!!target.value) {
      const rect = target.value.getBoundingClientRect();

      const calculation =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (!calculation) {
        displaceContent.value = true;
      }
    }
  }
);
</script>

<template>
  <div class="menu">
    <div>
      <slot name="activator" :onClick="handleChange" />
    </div>
    <div
      v-if="modelValue"
      ref="target"
      class="menu__content"
      :class="{ reverse: displaceContent }"
      @click="handleChange"
    >
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
    top: -180%;
    z-index: 200;
  }

  .reverse {
    top: 50%;
    left: 0;
  }

  &__bg {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
