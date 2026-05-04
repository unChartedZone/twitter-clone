<script setup lang="ts">
import { ref, reactive } from "vue";
import Alert from "@/components/common/Alert.vue";
import Button from "@/components/common/Button.vue";
import PageHeader from "@/components/PageHeader.vue";
import Textfield from "@/components/common/Textfield.vue";
import useChangePassword from "./useChangePassword";

const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const errorMessage = reactive({
  text: "",
  show: false,
});
const { saving, changePasswordMutation } = useChangePassword();

async function changePassword() {
  if (
    currentPassword.value === "" ||
    newPassword.value === "" ||
    confirmPassword.value === ""
  )
    return;

  await changePasswordMutation.mutateAsync(
    {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    },
    {
      onSuccess: () => {
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      },
      onError: () => {
        errorMessage.show = true;
        errorMessage.text = "Failed to update password";
      },
    },
  );
}
</script>

<template>
  <PageHeader title="Change your password" />
  <section>
    <Textfield
      v-model="currentPassword"
      type="password"
      label="Current password"
    />
  </section>
  <section>
    <Textfield
      v-model="newPassword"
      type="password"
      class="mb-4"
      label="New password"
    />
    <Textfield
      v-model="confirmPassword"
      type="password"
      label="Confirm password"
    />
  </section>
  <section>
    Changing your password will log you out of all your active Twitter sessions
    except the on you're using at this time.
  </section>
  <section class="save-section">
    <Button @click="changePassword" :loading="saving">Save</Button>
  </section>
  <Alert v-model="errorMessage.show">{{ errorMessage.text }}</Alert>
</template>

<style scoped lang="scss">
section {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid $gray-100;
}

.save-section {
  display: flex;
  justify-content: end;
}
</style>
