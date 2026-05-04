import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/lib/types/models";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string>();
  const user = ref<User>();
  const authInitialized = ref(false);
  const authReadyPromise = new Promise<void>((resolve) => {
    const unwatch = watch(authInitialized, (initialized) => {
      if (initialized) {
        unwatch();
        resolve();
      }
    });
  });

  const loggedIn = computed<boolean>(() => {
    return !!user.value && !!accessToken.value;
  });

  async function logoutUser() {
    $reset();
  }

  function setUserAuthState(userValue: User, token?: string) {
    user.value = userValue;
    if (token) accessToken.value = token;
  }

  function markAuthInitialized() {
    authInitialized.value = true;
  }

  /**
   * Reset state of store
   */
  function $reset() {
    user.value = undefined;
    accessToken.value = undefined;
  }

  return {
    accessToken,
    user,
    loggedIn,
    authInitialized,
    authReadyPromise,
    logoutUser,
    setUserAuthState,
    markAuthInitialized,
    $reset,
  };
});
