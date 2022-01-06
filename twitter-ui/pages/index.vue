<template>
  <main class="flex flex-col h-screen bg-black text-white">
    <div class="grid grid-cols-2 flex-grow">
      <section class="left-pane h-full">
        <div class="relative h-1/2 flex justify-center align-center">
          <TwitterLogo class="h-full absolute fill-current" />
        </div>
      </section>
      <section class="flex flex-col h-full p-6">
        <!-- <div>
          <v-textfield label="Email" type="text" />
          <v-textfield label="Password" type="password" />
          <v-button outlined>Log In</v-button>
        </div> -->

        <div class="flex items-center flex-grow">
          <div>
            <TwitterLogo class="h-16 mb-8 fill-current" />
            <h1 class="text-6xl font-bold my-8">Happening Now</h1>
            <h2 class="text-3xl font-bold my-8">Join Twitter Today.</h2>
            <div class="flex flex-col gap-4">
              <v-button>Sign Up</v-button>
              <v-button outlined @click="$router.push('/login')">
                Log in
              </v-button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="w-full flex justify-center">
      <ul
        class="flex flex-wrap justify-center py-4 space-x-8 text-xs text-gray-500 mx-auto"
      >
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
import TwitterLogo from '@/assets/svg/bird.svg';

export default Vue.extend({
  components: { TwitterLogo },
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
.left-pane {
  background-image: url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png');
  @apply flex;
  @apply justify-center;
  @apply items-center;
}
</style>
