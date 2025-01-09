<script setup lang="ts">
import TweetMedia from "./TweetMedia.vue";

defineProps<{
  mediaItems: { file: File; description?: string }[];
}>();

defineEmits<{ (event: "onRemoveMediaItem", index: number): void }>();
</script>

<template>
  <div class="media-grid">
    <TweetMedia
      v-for="(media, index) in mediaItems"
      :key="media.file.name"
      :src="media.file"
      @onRemove="$emit('onRemoveMediaItem', index)"
    />
  </div>
</template>

<style scoped lang="scss">
.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  max-height: 22rem;
  overflow-y: scroll;
}
</style>
