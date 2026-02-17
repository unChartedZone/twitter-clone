import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login, logout, refresh, patchUser } from "@/api/endpoints";
import { useProfileStore } from "./profile";
import type { UserPatch } from "@/models/User";
import type Tweet from "@/models/Tweet";
import type { LoginPayload } from "@/types/RequestPayloads";
import type { LoadingState } from "@/types/LoadingState";
import type { components } from "api-schema";

export type User = components["schemas"]["User"];

export const useAuthStore = defineStore("auth", () => {
  const userFetchState = ref<LoadingState>();
  const accessToken = ref<string>();
  const user = ref<User>();
  const profileStore = useProfileStore();

  const userFetchStateLoading = computed<boolean>(
    () => userFetchState.value === "idle",
  );

  const loggedIn = computed<boolean>(() => {
    return !!user.value && !!accessToken.value;
  });

  async function refreshUser() {
    userFetchState.value = "idle";
    try {
      const res = await refresh();
      if (res) {
        accessToken.value = res.meta.token;
        user.value = res.user;
        userFetchState.value = "resolved";
      }
    } catch (e) {
      userFetchState.value = "rejected";
    }
  }

  async function logoutUser() {
    await logout();
    $reset();
    profileStore.$reset();
  }

  async function updateUser(
    userPatch: UserPatch,
    bannerImage?: File,
    profileImage?: File,
  ) {
    if (!user.value) return;

    const updatedUser = await patchUser(
      user.value?.id,
      { ...userPatch },
      bannerImage,
      profileImage,
    );

    profileStore.setProfileUser({ ...updatedUser });

    // If name was updated we should update any tweets of the user to match new name
    if (
      !!userPatch.name &&
      user.value.username === profileStore.profileUser?.username
    ) {
      profileStore.tweetLists.default.tweets =
        profileStore.tweetLists.default.tweets.map((tweet) => {
          if (tweet.user?.username === user.value?.username) {
            return {
              ...tweet,
              user: {
                ...tweet.user,
                name: userPatch.name,
              },
            } as Tweet;
          }

          return {
            ...tweet,
          };
        });
    }

    user.value = {
      ...user.value!,
      ...updatedUser,
    };
  }

  function setUserAuthState(userValue: User, token: string) {
    user.value = userValue;
    accessToken.value = token;
  }

  /**
   * Locally increment following count of authenticated user
   */
  function incrementFollowingCount() {
    if (user.value) {
      user.value = {
        ...user.value,
        totalFollowing: user.value?.totalFollowing + 1,
      };
    }
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
    refreshUser,
    logoutUser,
    setUserAuthState,
    updateUser,
    incrementFollowingCount,
  };
});
