<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "./common/Button.vue";

const router = useRouter();
const authStore = useAuthStore();

async function loginAsGuest() {
  await authStore.loginUser({
    email: "guest@example.com",
    password: "Guest123",
  });
  router.push("/home");
}
</script>

<template>
  <div class="guest-message">
    <h3>Dear Recruiter or Hiring Manager</h3>
    <p>To access the guest account, click the button below.</p>
    <Button variant="monochrome" @click="loginAsGuest">Log in as Guest</Button>
  </div>
</template>

<style scoped lang="scss">
.guest-message {
  background-color: $primary;
  color: $white;
  border-radius: 8px;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  max-width: 22rem;
  width: 80%;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  z-index: 2000;
}
</style>
