<script setup lang="ts">
import Button from "../common/Button.vue";
import { Card, CardHeader } from "@/components/common/card";
import Icon from "@/components/icons/Icon.vue";
import Image from "../common/Image.vue";

interface MediaEditorProps {
  imageUrl?: string;
}

defineProps<MediaEditorProps>();
defineEmits(["onCancel", "onApplyImage"]);
</script>

<template>
  <Card>
    <CardHeader>
      <template #left>
        <Button variant="icon-ghost" size="icon" @click="$emit('onCancel')">
          <Icon variant="left-arrow" />
        </Button>
      </template>
      <div class="flex justify-center">
        <h1>Edit Media</h1>
      </div>
      <template #right>
        <Button @click="$emit('onApplyImage')">Apply</Button>
      </template>
    </CardHeader>
    <Image :src="imageUrl" alt="Uploaded image for profile" />
  </Card>
</template>
