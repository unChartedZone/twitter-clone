<template>
  <main class="bg-black text-white min-h-screen">
    <div class="w-96 mx-auto space-y-6 py-6">
      <div class="w-12">
        <TwitterLogo style="color: white; fill: white" />
      </div>
      <!-- <img class="h-16" src="~/assets/svg/bird.svg" alt="Twitter Bird Icon" /> -->
      <h1 class="text-4xl font-bold">Log in to Twitter</h1>
      <v-textfield label="Phone, email, or username" placeholder="Phone" />
      <v-textfield label="Password" type="password" />
      <v-button disabled block>Log in</v-button>
      <div class="flex justify-center gap-2">
        <v-link>Forgot Password?</v-link>
        <span>·</span>
        <v-link>Sign up for Twitter</v-link>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import TwitterLogo from '@/assets/svg/bird.svg';

export default Vue.extend({
  components: { TwitterLogo },
});
</script>
