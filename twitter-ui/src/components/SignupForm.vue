<template>
  <Card class="signup-form">
    <CardHeader>
      <template #left>
        <Button variant="icon-ghost" size="icon" @click="$emit('closeForm')">
          <Icon variant="cross" />
        </Button>
      </template>
      <div class="flex justify-center items-center">
        <Icon variant="bird" style="height: 2rem" />
      </div>
    </CardHeader>
    <CardBody>
      <div>
        <h2 class="mb-4">Create new account</h2>
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
          <Button block size="xl" :loading="isPending" type="submit">
            Signup
          </Button>
        </form>
      </div>
    </CardBody>
  </Card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import Button from "./common/Button.vue";
import { Card, CardBody, CardHeader } from "@/components/common/card";
import DateSelector from "./DateSelector.vue";
import Icon from "./icons/Icon.vue";
import Textfield from "./common/Textfield.vue";
import useAuth from "@/hooks/useAuth";

const emit = defineEmits(["closeForm"]);
const { signupUserMutation } = useAuth();
const { mutate, isPending } = signupUserMutation;

const formState = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
  birthDate: dayjs().format("YYYY-MM-DD"),
});

async function signupUser() {
  mutate({ user: formState });
}
</script>

<style scoped lang="scss">
.signup-form {
  @include respond(md) {
    height: 50vh;
    overflow-y: scroll;
  }
}

.birth-date-field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}
</style>
