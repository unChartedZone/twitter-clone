<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppLoadingScreen from "./components/AppLoadingScreen.vue";
import useAuth from "./lib/hooks/useAuth";

const authStore = useAuthStore();
const { refreshUserMutation } = useAuth();
const { isPending } = refreshUserMutation;
</script>

<template>
  <!-- <AppLoadingScreen v-if="authStore.userFetchStateLoading" /> -->
  <AppLoadingScreen v-if="isPending" />
  <component :is="$route.meta.layout || 'main'">
    <RouterView />
  </component>
</template>
