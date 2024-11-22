<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { BaseUser } from "@/models/User";
import AvatarCircle from "../AvatarCircle.vue";

interface FollowsListProps {
  followees: BaseUser[];
}

defineProps<FollowsListProps>();
</script>

<template>
  <section>
    <RouterLink
      v-for="followee in followees"
      :key="followee.id"
      :to="`/${followee.username}`"
      class="user"
    >
      <AvatarCircle :src="followee.profileImage" />
      <section>
        <div class="user__title">
          <div>
            <h3 class="user__name">{{ followee.name }}</h3>
            <p class="user__username">@{{ followee.username }}</p>
          </div>
          <slot name="list-actions" :followee="followee" />
        </div>
        <div class="user__bio">
          <p>{{ followee.bio }}</p>
        </div>
      </section>
    </RouterLink>
  </section>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: $white;

  &:hover {
    background-color: $gray-100;
  }

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

  &__name {
    &:hover {
      text-decoration: underline;
    }
  }

  &__username {
    font-size: 0.95rem;
  }

  &__bio {
    margin: 0.5rem 0 0;
  }
}
</style>
