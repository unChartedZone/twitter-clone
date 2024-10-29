<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

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
    <p>Dear Recruiter or Hiring Manager</p>
    <p>
      If you would like to access the guest account, please use the credentials
      provided below.
    </p>
    <Button @click="loginAsGuest" color="white">Log in as Guest</Button>
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
  width: 20rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  z-index: 100;
}
</style>
