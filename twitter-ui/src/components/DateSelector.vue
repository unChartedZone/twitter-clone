<template>
  <div class="date-selector">
    <Select v-model="dateState.month" label="Month" :options="months" />
    <Select v-model="dateState.day" label="Day" :options="days" />
    <Select v-model="dateState.year" label="Year" :options="years" />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import dayjs from "dayjs";

interface DateSelectorProps {
  modelValue: Date;
}

const props = defineProps<DateSelectorProps>();
const emit = defineEmits(["update:modelValue"]);

const date = dayjs(props.modelValue).toDate();
const dateState = reactive<{
  month: string;
  day?: number;
  year: number;
}>({
  month: date.toLocaleString("default", { month: "long" }),
  day: dayjs(date).date(),
  year: dayjs(date).year(),
});

const months = Array.from({ length: 12 }, (_item, i) =>
  new Date(0, i).toLocaleDateString("en-US", { month: "long" })
);

const days = computed(() => {
  const dayCount = new Date(
    !dateState.year ? new Date().getFullYear() : dateState.year,
    months.findIndex((x) => x == dateState.month) + 1,
    0
  ).getDate();
  return Array.from({ length: dayCount }, (_, index) => index + 1);
});

const years = Array.from(
  { length: new Date().getFullYear() - 1900 },
  (_, index) => 1901 + index
).reverse();

watch(
  () => dateState.month,
  (newVal, oldVal) => {
    if (dateState.day && dateState.day > days.value.length) {
      dateState.day = undefined;
    }
  }
);

watch(dateState, (newDate, oldDate) => {
  emit(
    "update:modelValue",
    dayjs(`${newDate.year}-${newDate.month}-${newDate.day}`).toDate()
  );
});
</script>

<style lang="scss">
.date-selector {
  display: flex;
  gap: 1rem;
}
</style>
