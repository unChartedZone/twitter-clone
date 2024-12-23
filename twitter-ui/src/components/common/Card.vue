<template>
  <div class="card">
    <header class="card__header">
      <slot name="header" />
    </header>
    <slot />
    <footer class="card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: $white;
  border-radius: $rounded;
  width: 100%;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.5rem;
  }

  &__footer {
    padding: 0.25rem 0.5rem;
  }
}
</style>
