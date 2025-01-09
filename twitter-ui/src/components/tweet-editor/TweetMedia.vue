<script setup lang="ts">
import Button from "../common/Button.vue";
import Icon from "../icons/Icon.vue";
import Image from "../common/Image.vue";

defineProps<{ src: File }>();
defineEmits<{
  (event: "onRemove"): void;
}>();
</script>

<template>
  <div class="tweet-media">
    <Image :src="src" />
    <Button
      @click="$emit('onRemove')"
      class="close-button"
      variant="icon-monochrome"
      size="icon-sm"
    >
      <Icon variant="cross" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.tweet-media {
  border-radius: 20px;
  border: 1px solid rgba(207, 217, 222, 1);
  box-shadow: $shadow;
  overflow: hidden;
  position: relative;
  height: 10rem;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
