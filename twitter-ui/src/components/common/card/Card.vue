<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $white;
  border-radius: $rounded;
  overflow: hidden;
}
</style>
