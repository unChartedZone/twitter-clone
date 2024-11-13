<script setup lang="ts">
import type { LoadingState } from "@/types/LoadingState";
import { ref } from "vue";

interface ImageProps {
  src: string;
  alt?: string;
}

const isLoaded = ref<LoadingState>("idle");

defineProps<ImageProps>();
</script>

<template>
  <div class="image__container">
    <img
      class="object-cover object-center"
      :src="src"
      :alt="alt"
      @load="isLoaded = 'resolved'"
    />
    <div v-if="isLoaded == 'idle'" class="image__loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.image {
  &__container {
    position: relative;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 150%;
    width: 150%;
    background: linear-gradient(
      90deg,
      rgba(lightgrey, 0) 0,
      rgba(lightgrey, 0.8) 50%,
      rgba(lightgrey, 0) 100%
    );
    animation: loading 1s infinite;
  }
}

@keyframes loading {
  from {
    left: -105%;
  }

  to {
    left: 105%;
  }
}
</style>
