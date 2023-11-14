<script setup lang="ts">
import { defineAsyncComponent } from "vue";

interface IconProps {
  name: string;
  fill?: string;
}

const props = withDefaults(defineProps<IconProps>(), { fill: "black" });

const icon = defineAsyncComponent(
  () => import(`../assets/svg/${props.name}.svg`)
);
</script>

<template>
  <component :is="icon" :style="{ fill }" />
</template>
