import type { Component } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { setupAuthClient } from "@/api/client";
import { useAuthStore } from "@/stores/auth";
import Default from "@/layouts/default.vue";
import SearchField from "@/components/SearchField.vue";
import WhoToFollow from "@/components/WhoToFollow.vue";

// Add typings for Route Meta properties
declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    layout?: Component;
    sidebarComponents?: Component[];
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/IndexView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("../views/ExploreView.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [WhoToFollow],
      },
    },
    {
      path: "/notifications",
      name: "notifications",
      component: () => import("../views/NotificationsView.vue"),
      meta: { requiresAuth: true, layout: Default },
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: () => import("../views/BookmarksView.vue"),
      meta: { requiresAuth: true, layout: Default },
    },
    {
      path: "/:username(.*)*",
      name: "UserProfile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
      children: [
        {
          name: "profile",
          path: "",
          component: () => import("../views/profile/ProfileTweetsView.vue"),
        },
        {
          name: "replies",
          path: "replies",
          component: () => import("../views/profile/RepliesView.vue"),
        },
        {
          name: "media",
          path: "media",
          component: () => import("../views/profile/MediaTweetsView.vue"),
        },
        {
          name: "likes",
          path: "likes",
          component: () => import("../views/profile/LikedTweetsView.vue"),
        },
      ],
    },
    {
      path: "/:username(.*)*/following",
      name: "Following",
      component: () => import("../views/profile/Following.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
    },
    {
      path: "/:username(.*)*/followers",
      name: "Followers",
      component: () => import("../views/profile/Followers.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  // attempt to refresh user session
  if (!authStore.accessToken) {
    await authStore.refreshUser();
    await setupAuthClient();
  }

  // If navigating to a route that requires authentication and not currently
  // logged in, then redirect to login page.
  if (to.meta.requiresAuth && !authStore.loggedIn) {
    return "/login";
  }

  // If navigating to a route that doesn't require authentication (home, login,
  // etc), then redirect to home feed page.
  if (!to.meta.requiresAuth && authStore.loggedIn) {
    return "/home";
  }
});

export default router;
