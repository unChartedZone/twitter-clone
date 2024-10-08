<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const user = reactive({
  identifier: "",
  password: "",
});

async function handleLoginSubmit() {
  const identifier = user.identifier;
  if (isValidEmail(identifier)) {
    await authStore.loginUser({ email: identifier, password: user.password });
  } else {
    // Assume they typed in their username
    await authStore.loginUser({
      username: identifier,
      password: user.password,
    });
  }

  router.push("/home");
}

function isValidEmail(email: string): boolean {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return emailRegex.test(email);
}
</script>

<template>
  <main class="login__wrapper">
    <div class="login__form w-96 mx-auto space-y-6 py-6">
      <div class="login__logo">
        <Icon name="bird" fill="white" />
      </div>
      <h1 class="login__header">Log in to Twitter</h1>

      <form @submit.prevent="handleLoginSubmit">
        <Textfield
          v-model="user.identifier"
          label="Phone, email, or username"
          placeholder="Phone"
        />
        <Textfield
          v-model="user.password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <Button block type="submit">Log in</Button>
      </form>
      <div class="login__footer">
        <Link text>Forgot Password?</Link>
        <span>·</span>
        <Link to="/signup" text>Sign up for Twitter</Link>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.login {
  &__wrapper {
    background-color: $black;
    color: $white;
    min-height: 100vh;
  }

  &__form {
    width: 24rem;
    margin: 0 auto;
    padding: 1.5rem 0;

    & > * + * {
      margin-top: 1.5rem;
    }

    form > * + * {
      margin-top: 1rem;
    }
  }

  &__header {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
  }

  &__logo {
    width: 3rem;
  }

  &__footer {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
