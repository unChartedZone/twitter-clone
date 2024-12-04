<script setup lang="ts">
import LoadingIcon from "./common/LoadingIcon.vue";
</script>

<template>
  <div class="page-loader">
    <LoadingIcon />
  </div>
</template>

<style scoped lang="scss">
.page-loader {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
