<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
button {
  @apply bg-blue-500;
  @apply px-4;
  @apply rounded-lg;
}
</style>
