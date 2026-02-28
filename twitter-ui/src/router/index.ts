import type { Component } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Default from "@/layouts/default.vue";
import SearchField from "@/components/SearchField.vue";
import WhoToFollow from "@/components/WhoToFollow.vue";
import useAuth from "@/hooks/useAuth";

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
      name: "forgot-password",
      path: "/forgot-password",
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: { requiresAuth: false },
    },
    {
      name: "password-reset",
      path: "/password-reset",
      component: () => import("../views/PasswordResetView.vue"),
      meta: { requiresAuth: false },
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
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/messages/MessagesView.vue"),
      children: [
        {
          name: "select-chat-view",
          path: "",
          component: () => import("../views/messages/SelectChatView.vue"),
        },
        {
          name: "messages-chat",
          path: ":threadId",
          component: () => import("../views/messages/MessagesChatView.vue"),
          props: true,
        },
      ],
      meta: {
        requiresAuth: true,
        layout: Default,
      },
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: () => import("../views/BookmarksView.vue"),
      meta: {
        requiresAuth: true,
        layout: Default,
        sidebarComponents: [SearchField, WhoToFollow],
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue"),
      meta: { requiresAuth: true, layout: Default },
      children: [
        {
          name: "account-settings",
          path: "account",
          component: () => import("../views/settings/SettingsAccountView.vue"),
        },
        {
          name: "security-settings",
          path: "security",
          component: () => import("../views/settings/SettingsSecurityView.vue"),
        },
        {
          name: "privacy-settings",
          path: "privacy",
          component: () => import("../views/settings/SettingsPrivacyView.vue"),
        },
        {
          name: "notification-settings",
          path: "notifications",
          component: () =>
            import("../views/settings/SettingsNotificationView.vue"),
        },
        {
          name: "accessibility-settings",
          path: "accessibility",
          component: () =>
            import("../views/settings/SettingsAccessibilityView.vue"),
        },
        {
          name: "change-password",
          path: "password",
          component: () => import("../views/settings/ChangePasswordView.vue"),
        },
      ],
    },
    {
      name: "NotImplemented",
      path: "/not-implemented",
      component: () => import("../views/NotImplementedView.vue"),
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
    {
      path: "/:username/status/:tweetId",
      name: "TweetDetails",
      component: () => import("../views/TweetDetailsView.vue"),
      props: true,
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
  const { refreshUserMutation } = useAuth();

  // attempt to refresh user session
  if (!authStore.loggedIn && !refreshUserMutation.isError.value) {
    await refreshUserMutation.mutateAsync();
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
