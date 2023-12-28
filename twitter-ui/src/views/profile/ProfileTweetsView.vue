<script setup lang="ts">
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
</script>

<template>
  <div>
    <ul>
      <li class="tweet" v-for="tweet in profileStore.tweets">
        <img
          v-for="media in tweet.medium"
          :src="media.url"
          :alt="media.description"
          style="widht: 100px; height: 100px"
        />
        <p>{{ tweet.text }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.tweet {
  height: 40rem;
}
</style>
