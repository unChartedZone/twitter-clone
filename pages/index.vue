<template>
  <main class="flex flex-col h-screen" style="border: 1px solid red">
    <div class="grid grid-cols-2 flex-grow">
      <div class="some">
        <ul>
          <li>Follow your interests.</li>
          <li>Hear what people are talking about.</li>
          <li>Join the converstation.</li>
        </ul>
      </div>
      <div>
        <h1>See what's happening in the world right now</h1>

        <sub>Join Twitter today.</sub>
        <v-button>Sign Up</v-button>
        <v-button>Log In</v-button>
      </div>
    </div>
    <footer class="w-full border border-red-500">
      <ul class="flex justify-center space-x-8">
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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showLoginForm: false,
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
});
</script>

<style scoped lang="scss">
.some {
  background-image: url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png');
  @apply flex;
  @apply justify-center;
  @apply items-center;
}
</style>
