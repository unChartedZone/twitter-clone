import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { LoadingState } from "@/types/LoadingState";
import { useQueryClient } from "@tanstack/vue-query";
import type { UserFull } from "@/lib/types/models";

export const useAuthStore = defineStore("auth", () => {
  const queryClient = useQueryClient();
  const userFetchState = ref<LoadingState>();
  const accessToken = ref<string>();
  const user = ref<UserFull>();
  const authInitialized = ref(false);
  const authReadyPromise = new Promise<void>((resolve) => {
    const unwatch = watch(authInitialized, (initialized) => {
      if (initialized) {
        unwatch();
        resolve();
      }
    });
  });

  const userFetchStateLoading = computed<boolean>(
    () => userFetchState.value === "idle",
  );

  const loggedIn = computed<boolean>(() => {
    return !!user.value && !!accessToken.value;
  });

  async function logoutUser() {
    $reset();
  }

  function setUserAuthState(userValue: UserFull, token?: string) {
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
    userFetchState,
    userFetchStateLoading,
    loggedIn,
    authInitialized,
    authReadyPromise,
    logoutUser,
    setUserAuthState,
    markAuthInitialized,
    $reset,
  };
});
