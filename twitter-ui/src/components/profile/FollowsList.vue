<script setup lang="ts">
import type { BaseUser } from "@/models/User";
import AvatarCircle from "../AvatarCircle.vue";

interface FollowsListProps {
  followees: BaseUser[];
}

defineProps<FollowsListProps>();
</script>

<template>
  <section>
    <div v-for="followee in followees" :key="followee.id" class="user">
      <AvatarCircle :src="followee.profileImage" />
      <section>
        <div class="user__title">
          <div>
            <h3>{{ followee.name }}</h3>
            <p>@{{ followee.username }}</p>
          </div>
          <slot name="list-actions" :followee="followee" />
        </div>
        <div>
          <p>{{ followee.bio }}</p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  gap: 1rem;
  padding: 1rem;

  section {
    flex: 1;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 1rem;
    }
  }
}
</style>
