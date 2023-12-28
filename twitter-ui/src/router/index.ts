import { setupAuthClient } from "@/api/client";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import Default from "@/layouts/default.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/IndexView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
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
      meta: { requiresAuth: true, layout: Default },
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("../views/ExploreView.vue"),
      meta: { requiresAuth: true, layout: Default },
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
      path: "/lists",
      name: "lists",
      component: () => import("../views/ListsView.vue"),
      meta: { requiresAuth: true, layout: Default },
    },
    {
      path: "/profile",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true, layout: Default },
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
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  // refresh user session
  if (!authStore.accessToken) {
    await authStore.refreshUser();
    await setupAuthClient();
  }

  if (to.meta.requiresAuth && !authStore.accessToken) {
    return "/login";
  } else if (!to.meta.requiresAuth && authStore.accessToken) {
    return "/home";
  }
});

export default router;
