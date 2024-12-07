<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { BaseUser } from "@/models/User";
import { exploreUsers, followUser } from "@/api/endpoints";
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "./AvatarCircle.vue";
import FollowButton from "./profile/FollowButton.vue";

const authStore = useAuthStore();
const users = ref<BaseUser[]>([]);

onMounted(async () => {
  users.value = await exploreUsers();
});

async function onFollow(followedUser: BaseUser) {
  const index = users.value.findIndex((x) => x.id == followedUser.id);
  users.value.splice(index, 1);
  authStore.incrementFollowingCount();
}
</script>

<template>
  <section>
    <div class="follows">
      <h2 class="mb-4">Who to follow</h2>
      <ul v-if="users.length > 0">
        <li class="user" v-for="user in users" :key="user.id">
          <div class="user__content">
            <AvatarCircle
              :src="user.profileImage"
              :alt="`Profile image for ${user.username}`"
            />
            <div>
              <h3 class="user__name">{{ user.name }}</h3>
              <p class="user__username">@{{ user.username }}</p>
            </div>
          </div>
          <div>
            <FollowButton :userId="user.id" @onFollow="onFollow" />
          </div>
        </li>
      </ul>
      <div v-else>
        <p>No users! Check back later</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.follows {
  border: 1px solid $gray-100;
  border-radius: $rounded;
  padding: 0.75rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

.user {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;

  &__content {
    display: flex;
    gap: 0.5rem;
    flex: 1;
  }

  &__name {
    font-size: 1rem;
  }
}
</style>
