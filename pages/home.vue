<template>
  <main class="container min-h-screen mx-auto grid grid-cols-3">
    <section class="h-screen w-72">
      <img
        class="h-24 mb-8 fill-current text-red-500"
        src="~/assets/svg/bird.svg"
        alt="Twitter Bird Icon"
        fill="white"
      />
      <ul class="space-y-2">
        <li class="list__item">Home</li>
        <li class="list__item">Explore</li>
        <li class="list__item">Notifications</li>
        <li class="list__item">Messages</li>
        <li class="list__item">Bookmarks</li>
        <li class="list__item">Lists</li>
        <li class="list__item">Profile</li>
        <li class="list__item">More</li>
      </ul>
      <v-button block>Tweet</v-button>
    </section>
    <section>
      <p>Home</p>
      <Tweet v-for="tweet in 4" :key="tweet" :text="tempMessage" />
    </section>
    <section class="w-80 border border-red-500">
      <v-textfield label="Search" />
    </section>
  </main>
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

<style lang="scss" scoped>
.list__item {
  @apply text-2xl;
  @apply font-bold;
  @apply py-3;
  @apply px-2;
  @apply rounded-full;
  @apply cursor-pointer;

  &:hover {
    @apply text-blue-400;
    @apply bg-blue-200;
  }
}
</style>
