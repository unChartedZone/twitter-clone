<script setup lang="ts">
defineProps<{
  // Horizontally center content
  center?: boolean;
}>();
</script>

<template>
  <div class="card-header" :class="{ center: !!center }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  align-items: center;
}

.center {
  justify-content: center;
}
</style>
