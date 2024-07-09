<template>
  <div class="tab-row">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tab-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $gray-100;
}
</style>
