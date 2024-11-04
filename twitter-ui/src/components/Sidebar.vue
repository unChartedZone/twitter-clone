<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AvatarCircle from "./AvatarCircle.vue";
import TweetEditorModal from "./tweet-editor/TweetEditorModal.vue";

interface NavLink {
  text: string;
  to: string;
  icon: string;
  activeIcon: string;
}

const router = useRouter();
const authStore = useAuthStore();
const toggleProfilePill = ref<boolean>(false);

const links: NavLink[] = [
  { text: "Home", to: "/home", icon: "home-outline", activeIcon: "home" },
  {
    text: "Explore",
    to: "/explore",
    icon: "magnify-glass",
    activeIcon: "magnify-glass-bold",
  },
  {
    text: "Notifications",
    to: "/notifications",
    icon: "bell-outline",
    activeIcon: "bell",
  },
  {
    text: "Bookmarks",
    to: "/bookmarks",
    icon: "bookmark-outline",
    activeIcon: "bookmark",
  },
  {
    text: "Profile",
    to: "/profile",
    icon: "profile-outline",
    activeIcon: "profile",
  },
];

async function logout() {
  await authStore.logoutUser();
  router.push("/");
}
</script>

<template>
  <aside class="nav-sidebar">
    <div class="nav-sidebar__content">
      <section>
        <Icon class="logo" name="bird" />
        <ul class="nav-sidebar__list">
          <li v-for="link in links">
            <RouterLink :to="link.to" v-slot="{ isActive }">
              <div class="nav-link">
                <div class="nav-link__content">
                  <span class="nav-link__icon">
                    <Icon v-if="isActive" :name="link.activeIcon" />
                    <Icon v-else :name="link.icon" />
                  </span>
                  <span>
                    {{ link.text }}
                  </span>
                </div>
              </div>
            </RouterLink>
          </li>
          <li>
            <div class="nav-link">
              <div class="nav-link__content">
                <Icon name="ellipsis" />
                More
              </div>
            </div>
          </li>
        </ul>
        <div style="width: 90%">
          <TweetEditorModal />
        </div>
      </section>
      <Menu v-model="toggleProfilePill">
        <template v-slot:activator="{ onClick }">
          <section class="profile-pill" @click="onClick">
            <div class="profile-pill__content">
              <AvatarCircle :src="authStore.user?.profileImage" />
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
            <ListItem>Add an existing account</ListItem>
            <ListItem @click="logout">
              Log out for @{{ authStore.user?.username }}
            </ListItem>
          </List>
        </div>
      </Menu>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.nav-sidebar {
  position: relative;
  height: 100vh;
  width: 17rem;
  z-index: 500;

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
}

.nav-link {
  display: inline-block;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.7rem;
  padding: 0.25rem 0;

  &__content {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 9999px;

    &:hover {
      background-color: $gray;
    }
  }

  &__icon {
    position: relative;
    width: 1.5rem;
    height: 2rem;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
