<script setup lang="ts">
import { ref, reactive, watch } from "vue";

interface MenuProps {
  modelValue?: boolean;
}

const props = defineProps<MenuProps>();
const emit = defineEmits(["update:modelValue"]);
const activator = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const position = reactive({
  top: 0,
  left: 0,
  transform: "",
});

function handleChange() {
  emit("update:modelValue", !props.modelValue);
}

// Watch for changes in position and dynamically change the menu's position
watch(
  () => [content.value, activator.value],
  ([c, a], _oldVal) => {
    if (!c || !a) return;

    const rect = a.getBoundingClientRect();
    const contentHeight = c.offsetHeight || 0;
    const contentWidth = c.offsetWidth || 0;
    const windowWidth = window.innerWidth;

    // Calculate vertical position
    if (rect.top - contentHeight < 0) {
      // Not enough space above, position below
      position.top = rect.bottom;
      position.transform = "";
    } else {
      // Position above
      position.top = rect.top;
      position.transform = "translateY(-100%)";
    }

    // Calculate horizontal position
    if (rect.left + contentWidth > windowWidth) {
      // Not enough space on the right, align to the right
      position.left = rect.right;
      position.transform += " translateX(-100%)";
    } else {
      // Align to the left
      position.left = rect.left;
    }
  }
);
</script>

<template>
  <div class="menu">
    <div ref="activator">
      <slot name="activator" :onClick="handleChange" />
    </div>
    <Teleport to="body">
      <div v-if="modelValue" class="menu__bg" @click="handleChange" />
      <div
        v-if="modelValue"
        ref="content"
        class="menu__content"
        :style="{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: position.transform,
        }"
        @click.stop
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.menu {
  position: relative;
  display: inline-block;

  &__content {
    position: fixed;
    z-index: 1000;
    background: $white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &__bg {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 500;
  }
}
</style>
