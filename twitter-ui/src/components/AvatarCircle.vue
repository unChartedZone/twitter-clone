<script setup lang="ts">
interface ProfilePicCircle {
  src?: string;
  alt?: string;
}

defineProps<ProfilePicCircle>();
</script>

<template>
  <img class="profile-pic" :src="src ?? '/images/default-pfp.png'" :alt="alt" />
</template>

<style scoped lang="scss">
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
