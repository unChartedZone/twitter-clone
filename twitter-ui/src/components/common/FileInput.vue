<template>
  <input
    ref="fileInputRef"
    type="file"
    hidden
    :accept="accept"
    :multiple="multiple"
    @change="onFileSelected"
  />
  <slot :onClick="onClick" />
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FileInputProps {
  modelValue?: File | File[];
  accept: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<FileInputProps>(), {
  accept: "*",
  multiple: false,
});

const emit = defineEmits<{
  (event: "update:modelValue", file: File | File[]): void;
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);

function onClick() {
  fileInputRef.value?.click();
}

function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = !target.files ? [] : Array.from(target.files);
  emit("update:modelValue", props.multiple ? files : files[0]);
}
</script>
