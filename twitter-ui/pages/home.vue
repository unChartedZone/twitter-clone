<template>
  <div>
    <!-- Home Header -->
    <section>
      <div class="fixed py-2">
        <h3 class="text-xl font-bold">Home</h3>
      </div>
    </section>
    <!-- Tweet Form -->
    <section></section>
    <!-- Tweets -->
    <section>
      <div class="max-h-screen overflow-y-scroll pt-8">
        <Tweet v-for="tweet in 80" :key="tweet" :text="tempMessage" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
