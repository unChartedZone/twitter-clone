<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="layout">
    <Sidebar />
    <main class="main__content">
      <slot />
    </main>
    <section>Search</section>
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  max-width: 1200px; // TODO: set responsive widths at smaller screen sizes
}

.main__content {
  border-left: 1px solid $gray-100;
  border-right: 1px solid $gray-100;
}
</style>
