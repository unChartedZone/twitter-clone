<script setup lang="ts">
import Button from "./common/Button.vue";
import useAuth from "@/lib/hooks/useAuth";

const { loginUserMutation } = useAuth();

async function loginAsGuest() {
  await loginUserMutation.mutateAsync({
    user: { email: "guest@example.com", password: "Guest123" },
  });
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
