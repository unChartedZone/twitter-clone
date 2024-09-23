<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { BaseUser } from "@/models/User";
import { exploreUsers } from "@/api/endpoints";

const users = ref<BaseUser[]>([]);

onMounted(async () => {
  users.value = await exploreUsers();
});
</script>

<template>
  <section>
    <div class="follows">
      <h2 class="mb-4">Who to follow</h2>
      <ul>
        <li class="user" v-for="user in users" :key="user.id">
          <div class="user__content">
            <img
              class="user__profile-image"
              :src="
                !user.profileImage
                  ? '/images/default-pfp.png'
                  : user.profileImage
              "
              :alt="`Profile image for ${user.username}`"
            />
            <div>
              <h3 class="user__name">{{ user.name }}</h3>
              <p class="user__username">@{{ user.username }}</p>
            </div>
          </div>
          <div>
            <Button color="black" size="1">Follow</Button>
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
  padding: 0.75rem 0.5rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
}

.user {
  display: flex;
  justify-content: space-between;

  &__content {
    display: flex;
    gap: 0.5rem;
    flex: 1;
  }

  &__profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__name {
    font-size: 1rem;
  }
}
</style>
