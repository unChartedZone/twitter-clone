<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="layout">
    <!-- Navigation sidebar component -->
    <Navbar />
    <!-- Main content -->
    <main class="main__content">
      <!-- Used to hold user pill and app logo icon at top of page on mobile screens -->
      <div class="mobile-header"></div>
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
  grid-template-columns: 17rem 4fr 2.5fr;
  max-width: 1300px;

  @include respond(xl) {
    grid-template-columns: 5rem 4fr 2.5fr;
  }

  @include respond(lg) {
    grid-template-columns: 5rem 6fr 1fr;

    & > :nth-child(3) {
      display: none;
    }
  }

  @include respond(md) {
    grid-template-columns: 5rem 6fr;
  }

  @include respond(sm) {
    grid-template-columns: 0fr 1fr;
  }
}

.main__content {
  border-left: 1px solid $gray-100;
  border-right: 1px solid $gray-100;

  @include respond(sm) {
    border-top: 1px solid $gray-100;
    margin-top: 3rem;
    padding: 0 0 3rem;
  }
}

.sidebar {
  position: relative;

  &__components {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0.5rem 0 0 0.5rem;
    z-index: 1;
  }
}

.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  background-color: $white;
  z-index: 10;

  @include respond(sm) {
    display: initial;
  }
}
</style>
