<template>
  <main class="bg-black text-white min-h-screen">
    <div class="w-96 mx-auto space-y-6 py-6">
      <div class="w-12">
        <TwitterLogo style="color: white; fill: white" />
      </div>
      <!-- <img class="h-16" src="~/assets/svg/bird.svg" alt="Twitter Bird Icon" /> -->
      <h1 class="text-4xl font-bold">Log in to Twitter</h1>

      <form @submit.prevent="handleLoginSubmit">
        <div class="space-y-4">
          <v-textfield
            v-model="user.email"
            label="Phone, email, or username"
            placeholder="Phone"
          />
          <v-textfield
            v-model="user.password"
            label="Password"
            type="password"
          />
          <v-button block>Log in</v-button>
        </div>
      </form>
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
import { mapMutations } from 'vuex';
import TwitterLogo from '@/assets/svg/bird.svg';

export default Vue.extend({
  components: { TwitterLogo },
  layout: 'guest',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapMutations({ setUser: 'auth/setUser' }),
    async handleLoginSubmit() {
      try {
        const response = await this.$axios.post('/login', {
          user: this.user,
        });

        // set user state from response
        const { user, access_token: accessToken } = response.data;
        this.setUser({ user, accessToken });

        this.$router.push('/home');
      } catch (e: any) {
        console.log(e.message);
      }
    },
  },
});
</script>
