<script setup lang="ts">
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import FileInput from "../common/FileInput.vue";

defineProps<{ isPublishing?: boolean }>();

const emit = defineEmits<{
  (event: "publishTweet"): Promise<void>;
  (event: "mediaAdded", media: File[]): void;
}>();
</script>

<template>
  <div class="actions">
    <FileInput
      accept=".jpg, .jpeg, .png"
      multiple
      @update:modelValue="
        (files) => {
          if (Array.isArray(files)) {
            $emit('mediaAdded', files);
          }
        }
      "
    >
      <template v-slot="{ onClick }">
        <Button variant="icon-ghost" size="icon" @click="onClick">
          <Icon variant="picture" />
        </Button>
      </template>
    </FileInput>
    <Button @click="$emit('publishTweet')" :loading="isPublishing">
      Tweet
    </Button>
  </div>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;
  padding: 0.5rem 0 0;
  border-top: 1px solid $gray;
}
</style>
