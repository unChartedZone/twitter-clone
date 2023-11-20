<template>
  <li class="list-item">
    <slot />
  </li>
</template>

<style scoped lang="scss">
.list-item {
  cursor: pointer;
  padding: 1rem 2rem;

  &:hover {
    background-color: rgb(247, 249, 249);
  }
}
</style>
