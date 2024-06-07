<script setup lang="ts">
interface MediaEditorProps {
  imageUrl?: string;
}

defineProps<MediaEditorProps>();
defineEmits(["onCancel", "onApplyImage"]);
</script>

<template>
  <Card>
    <template v-slot:header>
      <div class="profile-editor__header">
        <Button @click="$emit('onCancel')" icon="left-arrow" />
        <h1>Edit media</h1>
      </div>
      <Button @click="$emit('onApplyImage')">Apply</Button>
    </template>
    <div style="height: 70vh; width: 100%; overflow: hidden">
      <img
        style="width: 100%; height: 100%; object-fit: cover"
        :src="imageUrl"
        alt="Uploaded image for profile"
      />
    </div>
  </Card>
</template>
