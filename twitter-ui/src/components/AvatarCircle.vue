<script setup lang="ts">
import Image from "./common/Image.vue";

interface ProfilePicCircle {
  src?: string | null;
  alt?: string;
}

defineProps<ProfilePicCircle>();
</script>

<template>
  <Image
    class="profile-pic"
    :src="src ?? '/images/default-pfp.png'"
    :alt="alt"
  />
</template>

<style scoped lang="scss">
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @include respond(sm) {
    width: 30px;
    height: 30px;
  }
}
</style>
