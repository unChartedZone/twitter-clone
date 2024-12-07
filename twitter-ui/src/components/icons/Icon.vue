<script setup lang="ts">
import type { Component } from "vue";
import Bird from "./Bird.vue";
import Feather from "./Feather.vue";

type IconVariant = "bird" | "feather";

defineProps<{ variant: IconVariant }>();

const iconComponentMap = new Map<IconVariant, Component>();
iconComponentMap.set("bird", Bird);
iconComponentMap.set("feather", Feather);
</script>

<template>
  <component class="icon" :is="iconComponentMap.get(variant)" />
</template>

<style scoped lang="scss">
.icon {
  min-height: 1rem;
}
</style>
