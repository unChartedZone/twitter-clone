<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import AppLoadingScreen from "./components/AppLoadingScreen.vue";
import useAuth from "./lib/hooks/useAuth";

const { refreshUserMutation } = useAuth();
const { isPending } = refreshUserMutation;

onMounted(() => {
  refreshUserMutation.mutateAsync().catch(() => {});
});
</script>

<template>
  <AppLoadingScreen v-if="isPending" />
  <component :is="$route.meta.layout || 'main'">
    <RouterView />
  </component>
</template>
