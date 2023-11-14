import { setupAuthClient } from "@/api/client";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

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
      meta: { requiresAuth: true },
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
