<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Icon from "../icons/Icon.vue";
import { type IconVariant } from "@/types/IconVariants";
import NavLink from "./NavLink.vue";
import UserPill from "./UserPill.vue";
import TweetEditorModal from "../tweet-editor/TweetEditorModal.vue";

interface NavLink {
  text: string;
  to: string;
  icon: IconVariant;
  activeIcon: IconVariant;
}

const authStore = useAuthStore();

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
          <div>
            <Icon class="logo" variant="bird" />
          </div>
          <div>
            <ul class="navbar__list">
              <NavLink
                v-for="link in links"
                :key="link.text"
                :icon="link.icon"
                :activeIcon="link.activeIcon"
                :text="link.text"
                :to="link.to"
              />
              <NavLink text="More" icon="ellipsis" />
            </ul>
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
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include respond(xl) {
      align-items: center;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__user-pill {
    display: flex;

    @include respond(xl) {
      justify-content: center;
    }
  }
}

.logo {
  height: 2rem;
  margin: 0 0 0.75rem 0.75rem;

  @include respond(xl) {
    margin: 0 0 0.75rem;
  }
}
</style>
