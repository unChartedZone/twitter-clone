<script setup lang="ts">
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <main class="page">
    <div class="page__content">
      <section class="icon-section">
        <Icon name="bird" :size="40" fill="white" />
      </section>
      <section class="action-section">
        <Icon name="bird" size="md" />
        <h1>Happening now</h1>
        <h2>Join Twitter Today.</h2>
        <div class="action-section__links space-y-4">
          <Button block>Sign up</Button>
          <Link to="/login" block outline>Log in</Link>
        </div>
      </section>
    </div>
    <footer class="page__footer">
      <ul>
        <li>About</li>
        <li>Help Center</li>
        <li>Terms of Service</li>
        <li>Privacy Policy</li>
        <li>Cookie Policy</li>
        <li>Ads Info</li>
        <li>Blog</li>
        <li>Status</li>
        <li>Careers</li>
        <li>Brand Resources</li>
        <li>Advertising</li>
        <li>Marketing</li>
        <li>Twitter for Business</li>
        <li>Developers</li>
        <li>Directory</li>
        <li>Settings</li>
        <li>@{{ year }} Twitter, Inc.</li>
      </ul>
    </footer>
  </main>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    flex-grow: 1;
    align-items: center;
    justify-items: center;
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;

    ul {
      display: flex;
      justify-content: center;
      flex-wrap: 1;
      gap: 0.5rem;
    }

    li {
      list-style: none;
    }
  }
}

.icon-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100%;
  width: 100%;
}

.action-section {
  svg {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 3.75rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.875rem;
    margin-bottom: 1rem;
  }

  &__links {
    width: 20rem;
  }
}
</style>
