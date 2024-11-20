<script setup lang="ts">
interface ProfileHeaderProps {
  name?: string;
  totalTweets?: number;
}

defineProps<ProfileHeaderProps>();
</script>

<template>
  <header class="profile__header">
    <div>
      <Link @click="$router.go(-1)" icon>
        <Icon name="left-arrow" />
      </Link>
      <div>
        <h2>{{ name }}</h2>
        <span>{{ totalTweets }} tweets</span>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.profile__header {
  position: relative;
  width: 40rem;

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
