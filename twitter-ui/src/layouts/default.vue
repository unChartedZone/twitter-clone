<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main class="layout container">
    <Sidebar />
    <section>
      <slot />
    </section>
    <section>Search</section>
  </main>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
}
</style>
