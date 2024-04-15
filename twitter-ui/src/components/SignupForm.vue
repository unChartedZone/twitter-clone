<template>
  <Card>
    <CardHeader>
      <Icon name="bird" />
      <Button>Next</Button>
    </CardHeader>
    <CardBody>
      <div>
        <h2>Create new account</h2>
        <div class="space-y-4">
          <Textfield label="Name" />
          <Textfield label="Email" />
        </div>
        <div>
          <h4>Date of birth</h4>
          <div style="display: flex; gap: 1rem">
            <Select
              v-model="dateOfBirth.month"
              label="Month"
              :options="months"
            />
            <Select v-model="dateOfBirth.day" label="Day" :options="days" />
            <Select v-model="dateOfBirth.year" label="Year" :options="years" />
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import CardBody from "./common/card/CardBody.vue";

const dateOfBirth = reactive({
  month: "",
  day: "",
  year: "",
});

const months = Array.from({ length: 12 }, (item, i) =>
  new Date(0, i).toLocaleDateString("en-US", { month: "long" })
);

const days = computed(() => {
  const dayCount = new Date(
    !dateOfBirth.year ? new Date().getFullYear() : parseInt(dateOfBirth.year),
    months.findIndex((x) => x == dateOfBirth.month) + 1,
    0
  ).getDate();
  return Array.from({ length: dayCount }, (_, index) => index + 1);
});

const years = Array.from(
  { length: new Date().getFullYear() - 1900 },
  (_, index) => 1901 + index
).reverse();
</script>
