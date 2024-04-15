import { ref } from "vue";
import { defineStore } from "pinia";
import { login, logout, refresh } from "@/api/endpoints";
import type User from "@/models/User";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string>();
  const user = ref<User>();

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
    const res = await logout();
    user.value = undefined;
    accessToken.value = undefined;
  }

  function setUser(userValue: User) {
    user.value = userValue;
  }

  return {
    accessToken,
    user,
    loginUser,
    refreshUser,
    logoutUser,
    setUser,
  };
});
