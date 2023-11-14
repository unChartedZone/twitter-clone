import { ref } from "vue";
import { defineStore } from "pinia";
import { login, refresh } from "@/api/endpoints";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string>();
  const user = ref<User>();

  async function loginUser(payload: { email: string; password: string }) {
    const res = await login(payload);
    accessToken.value = res.accessToken;
    user.value = res.user;
  }

  async function refreshUser() {
    const res = await refresh();
    accessToken.value = res.accessToken;
    user.value = res.user;
  }

  return {
    accessToken,
    user,
    loginUser,
    refreshUser,
  };
});
