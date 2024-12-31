<template>
  <div class="card-footer">
    <div>
      <slot name="left" />
    </div>
    <div class="default">
      <slot />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
}
</style>
