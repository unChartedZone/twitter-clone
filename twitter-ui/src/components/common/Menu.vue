<script setup lang="ts">
import { ref, reactive, watch } from "vue";

interface MenuProps {
  modelValue?: boolean;
}

const props = defineProps<MenuProps>();
const emit = defineEmits(["update:modelValue"]);
const target = ref<HTMLElement | null>(null);

const contentBlocked = reactive({
  top: false,
  bottom: false,
  left: false,
  right: false,
});

function handleChange() {
  contentBlocked.top = false;
  contentBlocked.bottom = false;
  contentBlocked.left = false;
  contentBlocked.right = false;
  emit("update:modelValue", !props.modelValue);
}

watch(
  () => [props.modelValue, target.value],
  (val, _oldVal) => {
    if (!val) return;

    if (!!target.value) {
      const rect = target.value.getBoundingClientRect();

      if (rect.top <= 0) {
        contentBlocked.top = true;
      }
      if (
        rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight)
      ) {
        contentBlocked.bottom = true;
      }
      if (
        rect.right >=
        (window.innerWidth || document.documentElement.clientWidth)
      ) {
        contentBlocked.right = true;
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
      :class="{
        'push-top': contentBlocked.top,
        'push-bottom': contentBlocked.bottom,
        'push-left': contentBlocked.left,
        'push-right': contentBlocked.right,
      }"
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
    left: 0;
    z-index: 200;
  }

  .push-top {
    top: 50%;
    bottom: unset;
  }
  .push-bottom {
    bottom: 50%;
    top: unset;
  }

  .push-left {
    left: 0%;
    right: unset;
  }

  .push-right {
    right: -20%;
    left: unset;
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
