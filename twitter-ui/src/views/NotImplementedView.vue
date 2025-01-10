<script setup lang="ts">
import Button from "@/components/common/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="message">
    <h3>This feature has not been implemented.</h3>
    <Button @click="router.go(-1)">Go Back</Button>
  </div>
</template>

<style scoped lang="scss">
.message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 5rem 1rem 0;
}
</style>
