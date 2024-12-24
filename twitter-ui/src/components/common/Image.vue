<script setup lang="ts">
import { useImage } from "@vueuse/core";

interface ImageProps {
  src: string;
  alt?: string;
}

const props = withDefaults(defineProps<ImageProps>(), { src: "" });
const { isLoading } = useImage({ src: props.src });
</script>

<template>
  <div class="image__container">
    <div v-if="isLoading" class="image__loader" />
    <img class="object-cover object-center" :src="src" :alt="alt" />
  </div>
</template>

<style lang="scss" scoped>
.image {
  &__container {
    position: relative;
    overflow: hidden;
    background-color: $white;

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
    z-index: 100;
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
