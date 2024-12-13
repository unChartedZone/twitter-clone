<script setup lang="ts">
import Icon from "@/components/icons/Icon.vue";
</script>

<template>
  <div class="app-loading-screen">
    <Icon variant="bird" />
  </div>
</template>

<style scoped lang="scss">
.app-loading-screen {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;

  svg {
    height: 20rem;
  }
}
</style>
