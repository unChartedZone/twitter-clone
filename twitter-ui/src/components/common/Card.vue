<template>
  <div class="card">
    <header class="card__header">
      <slot name="header" />
    </header>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $white;
  border-radius: $rounded;
  min-width: 20rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
  }
}
</style>
