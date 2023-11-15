<script setup lang="ts">
import { RouterLink } from "vue-router";
import Icon from "./Icon.vue";
import Button from "./Button.vue";

const links = [
  { text: "Home", to: "/home", icon: "home" },
  { text: "Explore", to: "/explore", icon: "pound" },
  { text: "Notifications", to: "/home", icon: "bell" },
  { text: "Bookmarks", to: "/home", icon: "bookmark" },
  { text: "Lists", to: "/home", icon: "list" },
  { text: "Profile", to: "/profile", icon: "person" },
];
</script>

<template>
  <aside class="sidebar">
    <section>
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
      <Button block>Tweet</Button>
    </section>
    <section></section>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  height: 100vh;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__list {
    margin: 0.5rem 0;

    & > * + * {
      margin-top: 0.5rem;
    }
  }

  &__link {
    font-size: 1.5rem;
    line-height: 1.7rem;
    padding: 0.25rem 0;

    &:hover {
      span {
        background-color: rgba(229, 231, 235, 1);
      }
    }

    a {
      cursor: pointer;
      display: flex;
      align-items: center;
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
</style>
