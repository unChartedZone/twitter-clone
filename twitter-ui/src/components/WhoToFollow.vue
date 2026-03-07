<script setup lang="ts">
import { useRouter } from "vue-router";
import AvatarCircle from "./AvatarCircle.vue";
import FollowButton from "./profile/FollowButton.vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { authClient } from "@/api/client";
import type { ExploreUsersResponse } from "@/lib/types/responses";
import type { User } from "@/lib/types/models";

const router = useRouter();
const queryClient = useQueryClient();

const { data: users } = useQuery({
  queryKey: ["explore-users"],
  queryFn: async () => {
    const res = await authClient.get<ExploreUsersResponse>("/users/explore");
    return res.data.users;
  },
});

async function onFollow() {
  queryClient.invalidateQueries({ queryKey: ["explore-users"] });
}

function navigateToUserProfile(user: User) {
  router.push(`/${user.username}`);
}
</script>

<template>
  <section>
    <div class="follows">
      <h2 class="mb-4">Who to follow</h2>
      <div v-if="!users">
        <p>No users! Check back later</p>
      </div>
      <ul>
        <li class="user" v-for="user in users" :key="user.id">
          <div class="user__content">
            <AvatarCircle
              :src="user.profileImage"
              :alt="`Profile image for ${user.username}`"
            />
            <div class="user__link" @click="navigateToUserProfile(user)">
              <h3 class="user__name">{{ user.name }}</h3>
              <p class="user__username">@{{ user.username }}</p>
            </div>
          </div>
          <div>
            <FollowButton :userId="user.id" @onFollow="onFollow" />
          </div>
        </li>
      </ul>
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

  &__link {
    &:hover {
      cursor: pointer;

      p {
        text-decoration: underline;
      }
    }
  }

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
