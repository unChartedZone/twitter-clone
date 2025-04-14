<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Icon from "../icons/Icon.vue";
import { type IconVariant } from "@/types/IconVariants";
import NavLink from "./NavLink.vue";
import List from "../common/List.vue";
import ListItem from "../common/ListItem.vue";
import Menu from "@/components/common/Menu.vue";
import UserPill from "./UserPill.vue";
import TweetEditorModal from "../tweet-editor/TweetEditorModal.vue";

interface NavLink {
  text: string;
  to: string;
  icon: IconVariant;
  activeIcon: IconVariant;
}

const authStore = useAuthStore();
const toggleOptions = ref<boolean>(false);

const links: NavLink[] = [
  { text: "Home", to: "/home", icon: "home-outline", activeIcon: "home" },
  {
    text: "Explore",
    to: "/explore",
    icon: "magnifying-glass",
    activeIcon: "magnifying-glass-bold",
  },
  {
    text: "Notifications",
    to: "/notifications",
    icon: "bell-outline",
    activeIcon: "bell",
  },
  {
    text: "Messages",
    to: "/messages",
    icon: "message-outline",
    activeIcon: "message",
  },
  {
    text: "Bookmarks",
    to: "/bookmarks",
    icon: "bookmark-outline",
    activeIcon: "bookmark",
  },
  {
    text: "Profile",
    to: `/${authStore.user?.username}`,
    icon: "profile-outline",
    activeIcon: "profile",
  },
];
</script>

<template>
  <section class="navbar">
    <div class="navbar__container">
      <div class="navbar__content">
        <section class="navbar__links">
          <div class="logo">
            <Icon variant="bird" />
          </div>
          <div class="navbar__list">
            <NavLink
              v-for="link in links"
              :key="link.text"
              :icon="link.icon"
              :activeIcon="link.activeIcon"
              :text="link.text"
              :to="link.to"
            />
            <Menu v-model="toggleOptions">
              <template #activator>
                <NavLink
                  @click="toggleOptions = true"
                  class="more-options"
                  text="More"
                  icon="ellipsis"
                />
              </template>
              <List>
                <ListItem icon="list-outline">Lists</ListItem>
                <ListItem icon="profile-follow">Follower requests</ListItem>
                <RouterLink :to="{ name: 'settings' }">
                  <ListItem icon="gear">Settings and privacy</ListItem>
                </RouterLink>
              </List>
            </Menu>
          </div>
          <div>
            <TweetEditorModal />
          </div>
        </section>

        <section class="navbar__user-pill">
          <UserPill />
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.navbar {
  position: relative;
  width: inherit;
  z-index: 500;

  &__container {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 17rem;

    @include respond(xl) {
      width: 5rem;
    }

    @include respond(sm) {
      height: unset;
      top: unset;
      width: 100%;
      bottom: 0rem;
      left: 0;
      padding: 0;
    }
  }

  &__content {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 0.5rem;

    @include respond(xl) {
      align-items: center;
    }

    @include respond(sm) {
      height: initial;
      flex-direction: row;
      background-color: $white;
      border-top: 1px solid $gray-100;
      padding: 0;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @include respond(xl) {
      align-items: center;
    }

    @include respond(sm) {
      flex-direction: row;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include respond(sm) {
      justify-content: space-between;
      flex-direction: row;
      flex: 1;
      padding: 0 0.5rem;
    }
  }

  &__user-pill {
    display: flex;

    @include respond(xl) {
      justify-content: center;
    }

    @include respond(sm) {
      position: fixed;
      top: 0.5rem;
      left: 0.5rem;
    }
  }
}

.logo {
  height: 2rem;
  margin: 0 0 0.75rem 0.75rem;

  @include respond(xl) {
    margin: 0 0 0.75rem;
  }

  @include respond(sm) {
    position: fixed;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
