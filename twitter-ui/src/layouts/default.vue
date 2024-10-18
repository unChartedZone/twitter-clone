<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="layout">
    <!-- Navigation sidebar component -->
    <Sidebar />
    <!-- Main content -->
    <main class="main__content">
      <slot />
    </main>
    <!-- Additional sidebar component -->
    <section class="sidebar">
      <div class="sidebar__components">
        <component
          v-for="sidebarComponent in route.meta.sidebarComponents"
          :is="sidebarComponent"
        ></component>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 4fr 2.5fr;
  max-width: 1250px; // TODO: set responsive widths at smaller screen sizes
}

.main__content {
  border-left: 1px solid $gray-100;
  border-right: 1px solid $gray-100;
}

.sidebar {
  position: relative;
  width: 20rem;

  &__components {
    width: 20rem;
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0.5rem 0 0 0.5rem;
  }
}
</style>
