<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <component :is="$route.meta.layout || 'main'">
    <RouterView />
  </component>
</template>
