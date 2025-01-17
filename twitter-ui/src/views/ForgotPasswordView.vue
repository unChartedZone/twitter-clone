<script setup lang="ts">
import { reactive, ref } from "vue";
import passwordApi from "@/api/endpoints/passwords";
import Alert from "@/components/common/Alert.vue";
import Button from "@/components/common/Button.vue";
import PageHeader from "@/components/PageHeader.vue";
import Textfield from "@/components/common/Textfield.vue";

const email = ref<string>("");
const alert = reactive({ text: "", show: false });

async function submitPasswordResetRequest() {
  if (!email.value) return;

  const { message } = await passwordApi.submitPasswordReset(email.value);
  alert.text = message;
  alert.show = true;
  email.value = "";
}
</script>

<template>
  <main class="container mx-auto">
    <PageHeader title="Forgot Password" />
    <div>
      <form @submit.prevent="submitPasswordResetRequest">
        <Textfield v-model="email" label="Email" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
    <Alert v-model="alert.show" :delay="10">{{ alert.text }}</Alert>
  </main>
</template>
