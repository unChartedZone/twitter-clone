<template>
  <div class="card-header">
    <section class="card-header__left">
      <slot name="left" />
    </section>
    <section class="card-header__content">
      <h1>
        <slot />
      </h1>
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

    h1 {
      text-align: center;
      font-size: 1.2rem;
    }
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
