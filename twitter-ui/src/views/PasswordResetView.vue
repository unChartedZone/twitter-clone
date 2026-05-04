<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/common/Button.vue";
import Textfield from "@/components/common/Textfield.vue";
import useSettings from "@/lib/hooks/useSettings";

const props = defineProps<{ token: string }>();
const router = useRouter();
const password = reactive({ newPassword: "", confirmPassword: "" });
const { updatePasswordMutation } = useSettings();

async function submitPasswordUpdate() {
  if (!password.newPassword || !password.newPassword) return;

  try {
    updatePasswordMutation.mutateAsync({
      token: props.token,
      password: password.newPassword,
      passwordConfirmation: password.confirmPassword,
    });
    router.push({ name: "login" });
  } catch (e) {
    console.log("ruh roh");
  }
}
</script>

<template>
  <main class="container mx-auto">
    <form @submit.prevent="submitPasswordUpdate">
      <div class="form">
        <h1>Password Reset</h1>
        <Textfield
          v-model="password.newPassword"
          label="New Password"
          type="password"
        />
        <Textfield
          v-model="password.confirmPassword"
          label="Confirm New Password"
          type="password"
        />
        <Button :loading="updatePasswordMutation.isPending.value" type="submit">
          Submit
        </Button>
      </div>
    </form>
  </main>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50rem;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
