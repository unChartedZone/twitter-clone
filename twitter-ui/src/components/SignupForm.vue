<template>
  <Card>
    <CardHeader center>
      <Icon name="bird" />
    </CardHeader>
    <CardBody>
      <div>
        <h2>Create new account</h2>
        <form @submit.prevent="signupUser">
          <div class="space-y-4">
            <Textfield v-model="formState.username" label="Username" />
            <Textfield v-model="formState.name" label="Name" />
            <Textfield v-model="formState.email" label="Email" type="email" />
            <Textfield
              v-model="formState.password"
              label="Password"
              type="password"
            />
          </div>
          <div class="birth-date-field">
            <h4>Date of birth</h4>
            <p>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else
            </p>
            <DateSelector v-model="formState.birthDate" />
          </div>
          <Button block :loading="loading" type="submit">Signup</Button>
        </form>
      </div>
    </CardBody>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import * as api from "@/api/endpoints";
import router from "@/router";
import DateSelector from "./DateSelector.vue";
import CardBody from "./common/card/CardBody.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formState = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
  birthDate: new Date(),
});

const loading = ref(false);

async function signupUser() {
  loading.value = true;
  try {
    const res = await api.signupUser(formState);
    const user = res.data.attributes;
    authStore.setUser(user);
    router.push("/home");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.birth-date-field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}
</style>
