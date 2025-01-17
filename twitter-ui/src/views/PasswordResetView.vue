<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import passwordApi from "@/api/endpoints/passwords";
import Button from "@/components/common/Button.vue";
import Textfield from "@/components/common/Textfield.vue";

const route = useRoute();
const router = useRouter();
const token = ref<string>("");
const password = reactive({ newPassword: "", confirmPassword: "" });

onMounted(async () => {
  const t = route.query.token?.toString();

  if (!t) {
    router.push({ name: "login" });
    return;
  }

  token.value = t;
  try {
    await passwordApi.validPasswordToken(token.value);
  } catch (e) {
    router.push({ name: "login" });
  }
});

async function submitPasswordUpdate() {
  if (!password.newPassword || !password.newPassword) return;

  try {
    await passwordApi.updatePassword({
      token: token.value,
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
    <div class="form">
      <h1>Password Reset</h1>
      <form @submit.prevent="submitPasswordUpdate">
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
        <Button type="submit">Sumbit</Button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
.form {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
