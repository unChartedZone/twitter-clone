<template>
  <div class="card-header">
    <section class="card-header__left">
      <slot name="left" />
    </section>
    <section class="card-header__content">
      <slot />
    </section>
    <section class="card-header__right">
      <slot name="right" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem 0.5rem;

  &__content {
    flex: 2;
  }

  &__left,
  &__right {
    display: flex;
    flex: 1;
  }

  &__right {
    justify-content: end;
  }
}
</style>
