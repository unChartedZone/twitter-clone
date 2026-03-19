<script setup lang="ts">
import LoadingIcon from "../common/LoadingIcon.vue";

withDefaults(defineProps<{ size?: number }>(), { size: 30 });
</script>

<template>
  <div class="page-loader">
    <LoadingIcon :size="size" />
  </div>
</template>

<style scoped lang="scss">
.page-loader {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
