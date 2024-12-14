<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "./AvatarCircle.vue";
import Button from "./common/Button.vue";

const authStore = useAuthStore();
</script>

<template>
  <section class="reply-editor flex items-center gap-4 py-4">
    <AvatarCircle :src="authStore.user?.profileImage" />
    <!-- <Textfield label="Tweet your reply" /> -->
    <div>
      <Button>Post</Button>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
