<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "../AvatarCircle.vue";
import Icon from "../icons/Icon.vue";
import List from "../common/List.vue";
import ListItem from "../common/ListItem.vue";
import Menu from "../common/Menu.vue";

const authStore = useAuthStore();
const router = useRouter();
const toggleProfilePill = ref<boolean>(false);

async function logout() {
  await authStore.logoutUser();
  router.push("/");
}
</script>

<template>
  <section>
    <Menu v-model="toggleProfilePill">
      <template v-slot:activator="{ onClick }">
        <section class="profile-pill" @click="onClick">
          <div class="profile-pill__content">
            <AvatarCircle :src="authStore.user?.profileImage" />
            <div class="profile-pill__name">
              <h3>{{ authStore.user?.name }}</h3>
              <p>@{{ authStore.user?.username }}</p>
            </div>
          </div>
          <Icon variant="ellipsis" />
        </section>
      </template>
      <div>
        <List>
          <ListItem>Add an existing account</ListItem>
          <ListItem @click="logout">
            Log out for @{{ authStore.user?.username }}
          </ListItem>
        </List>
      </div>
    </Menu>
  </section>
</template>

<style scoped lang="scss">
.profile-pill {
  cursor: pointer;
  border-radius: 9999px;
  font-size: 0.85rem;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.75rem 1rem;

  @include respond(xl) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0;
  }

  @include respond(sm) {
    width: 30px;
    height: 30px;
  }

  &:hover {
    background-color: $gray;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__name {
    @include respond(xl) {
      display: none;
    }
  }

  h3 {
    font-size: 0.95rem;
  }

  svg {
    width: 1rem;

    @include respond(xl) {
      display: none;
    }
  }
}
</style>
