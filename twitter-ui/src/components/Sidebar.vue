<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const toggleProfilePill = ref<boolean>(false);

const links = [
  { text: "Home", to: "/home", icon: "home" },
  { text: "Explore", to: "/explore", icon: "pound" },
  { text: "Notifications", to: "/notifications", icon: "bell" },
  { text: "Bookmarks", to: "/bookmarks", icon: "bookmark" },
  { text: "Lists", to: "/lists", icon: "list" },
  { text: "Profile", to: "/profile", icon: "person" },
];

async function logout() {
  await authStore.logoutUser();
  router.push("/");
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__content">
      <section>
        <Icon class="logo" name="bird" />
        <ul class="sidebar__list">
          <li v-for="link in links" class="sidebar__link">
            <RouterLink :to="link.to">
              <span>
                <Icon :name="link.icon" />
                {{ link.text }}
              </span>
            </RouterLink>
          </li>
          <li class="sidebar__link">
            <span>
              <Icon name="ellipsis" />
              More
            </span>
          </li>
        </ul>
        <div style="width: 90%">
          <Button block>Tweet</Button>
        </div>
      </section>
      <Menu v-model="toggleProfilePill">
        <template v-slot:activator="{ onClick }">
          <section class="profile-pill" @click="onClick">
            <div class="profile-pill__content">
              <img
                class="profile-pill__pic"
                :src="authStore.user?.profileImage"
              />
              <div>
                <h3>{{ authStore.user?.name }}</h3>
                <p>@{{ authStore.user?.username }}</p>
              </div>
            </div>
            <Icon name="ellipsis" />
          </section>
        </template>
        <div>
          <List>
            <ListItem> Add an existing account </ListItem>
            <ListItem @click="logout"
              >Log out for @{{ authStore.user?.username }}</ListItem
            >
          </List>
        </div>
      </Menu>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: relative;
  height: 100vh;
  width: 17rem;

  &__content {
    position: fixed;
    height: 100%;
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
  }

  &__list {
    margin: 0.5rem 0;

    & > * + * {
      margin-top: 0.5rem;
    }
  }

  &__link {
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.7rem;
    padding: 0.25rem 0;
    display: flex;
    align-items: center;

    &:hover {
      span {
        background-color: $gray;
      }
    }

    span {
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 0.75rem;
    }

    svg {
      width: 1.5rem;
    }
  }
}

.logo {
  height: 2rem;
  margin: 0 0 0.75rem 0.5rem;
}

.profile-pill {
  cursor: pointer;
  border-radius: 9999px;
  font-size: 0.85rem;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: $gray;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: black;
  }

  h3 {
    font-size: 0.95rem;
  }

  svg {
    width: 1rem;
  }
}
</style>
