<script setup lang="ts">
import { computed } from "vue";
import Button from "@/components/Button.vue";
import Link from "@/components/Link.vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <main>
    <div class="main-section">
      <section>Twitter Logo</section>
      <section>
        <h1>Happening Now</h1>
        <h2>Join Twitter Today.</h2>
        <div class="login-flow-options">
          <Link to="/signup">Sign up</Link>
          <Link to="/login" outline>Log in</Link>
        </div>
      </section>
    </div>
    <section>
      <footer class="footer">
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
    </section>
  </main>
</template>

<style scoped lang="scss">
.main-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 90vh;
}

.login-flow-options {
  width: 24rem;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;

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
</style>
