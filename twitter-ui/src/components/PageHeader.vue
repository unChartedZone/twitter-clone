<script setup lang="ts">
interface PageHeaderProps {
  title: string;
  subtitle: string;
}

withDefaults(defineProps<PageHeaderProps>(), { title: "", subtitle: "" });
</script>

<template>
  <header class="page-header">
    <div>
      <Link @click="$router.go(-1)" icon>
        <Icon name="left-arrow" />
      </Link>
      <div>
        <h2>{{ title }}</h2>
        <span>{{ subtitle }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-header {
  position: relative;
  width: 40rem;
  margin: 0 0 3.5rem;

  & > div {
    backdrop-filter: blur(12px);
    width: inherit;
    position: fixed;
    z-index: 25;
    top: 0;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: rgba($white, 0.85);
    padding: 0.2rem 0;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  svg {
    height: 1.35rem;
  }

  span {
    font-size: 0.9rem;
  }
}
</style>
