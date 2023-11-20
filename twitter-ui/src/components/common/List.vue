<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<style scoped lang="scss">
.list {
  background-color: $white;
  border-radius: 12px;
  box-shadow: $shadow;
  padding: 0.5rem 0;
}
</style>
