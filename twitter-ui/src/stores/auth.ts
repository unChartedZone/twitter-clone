import { ref } from "vue";
import { defineStore } from "pinia";
import { login, logout, refresh, patchUser } from "@/api/endpoints";
import type User from "@/models/User";
import { useProfileStore } from "./profile";
import type { BaseUser, UserPatch } from "@/models/User";
import type Tweet from "@/models/Tweet";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string>();
  const user = ref<User>();
  const profileStore = useProfileStore();

  async function loginUser(payload: { email: string; password: string }) {
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

  function setUser(userValue: User) {
    user.value = userValue;
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
  };
});
