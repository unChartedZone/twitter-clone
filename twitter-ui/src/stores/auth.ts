import { ref } from "vue";
import { defineStore } from "pinia";
import { login, logout, refresh, patchUser } from "@/api/endpoints";
import type User from "@/models/User";
import { useProfileStore } from "./profile";
import type { BaseUser, UserPatch } from "@/models/User";
import type Tweet from "@/models/Tweet";
import type { LoginPayload } from "@/types/RequestPayloads";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string>();
  const user = ref<User>();
  const profileStore = useProfileStore();

  async function loginUser(payload: LoginPayload) {
    const res = await login(payload);
    accessToken.value = res.data.attributes.accessToken;
    user.value = res.data.attributes;
  }

  async function refreshUser() {
    const res = await refresh();
    if (res) {
      accessToken.value = res.data.attributes.accessToken;
      user.value = res.data.attributes;
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
    profileImage?: File
  ) {
    if (!user.value) return;

    const updatedUser = await patchUser(
      user.value?.id,
      { ...userPatch },
      bannerImage,
      profileImage
    );

    // If name was updated we should update any tweets of the user to match new name
    if (userPatch.name) {
      const modifiedTweets: Tweet[] = profileStore.tweets.map((tweet) => {
        return tweet.user?.name == user.value?.name
          ? ({
              ...tweet,
              user: {
                ...tweet.user,
                name: userPatch.name,
              },
            } as Tweet)
          : tweet;
      });
      profileStore.setTweets(modifiedTweets);
    }

    user.value = {
      ...user.value!,
      ...updatedUser,
    };
  }

  function setUser(userValue: User) {
    user.value = userValue;
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
    loginUser,
    refreshUser,
    logoutUser,
    setUser,
    updateUser,
    incrementFollowingCount,
  };
});
