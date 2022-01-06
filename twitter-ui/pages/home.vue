<template>
  <main class="container min-h-screen mx-auto grid grid-cols-main-content">
    <Sidebar />
    <section>
      <p>Home</p>
      <Tweet v-for="tweet in 4" :key="tweet" :text="tempMessage" />
    </section>
    <section class="border border-red-500">
      <v-textfield label="Search" />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

import Sidebar from '@/components/Sidebar.vue';

export default Vue.extend({
  components: {
    Sidebar,
  },
  data() {
    return {
      tempMessage: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      aliquam. Nisi doloribus iusto similique corporis ipsum maxime magni,
      ratione, veritatis voluptate molestias perferendis nesciunt adipisci
      sapiente eius, tenetur rem esse.
      `,
    };
  },
});
</script>
