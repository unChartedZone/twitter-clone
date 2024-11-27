<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppLoadingScreen from "./components/AppLoadingScreen.vue";

const authStore = useAuthStore();
</script>

<template>
  <AppLoadingScreen v-if="!authStore.loggedIn" />
  <component :is="$route.meta.layout || 'main'">
    <RouterView />
  </component>
</template>
