import { useMutation } from "@tanstack/vue-query";
import { client } from "@/lib/api/client";
import { setupAuthTypedClient } from "../api/client";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { LoginBody, SignupBody } from "@/lib/types/requests";

export default function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();

  const loginUserMutation = useMutation({
    mutationFn: async (user: LoginBody) => {
      const { data, error } = await client.POST("/login", { body: user });
      if (error || !data) throw error ?? new Error("Login failed");
      return data;
    },
    onSuccess: async ({ user, meta }) => {
      authStore.setUserAuthState(user, meta.token);
      setupAuthTypedClient(refreshUserMutation);
      router.push("/home");
    },
  });

  const signupUserMutation = useMutation({
    mutationFn: async (payload: SignupBody) => {
      const { data, error } = await client.POST("/signup", { body: payload });
      if (error || !data) throw Error("Signup failed");
      return data;
    },
    onSuccess: async ({ user, meta }) => {
      authStore.setUserAuthState(user, meta.token);
      setupAuthTypedClient(refreshUserMutation);
      router.push("/home");
    },
  });

  const refreshUserMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await client.POST("/refresh");
      if (error || !data) throw Error("Login Failed");
      return data;
    },
    onSuccess: async ({ user, meta }) => {
      authStore.markAuthInitialized();

      setupAuthTypedClient(refreshUserMutation);
      authStore.setUserAuthState(user, meta.token);
    },
    onError: () => {
      authStore.markAuthInitialized();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { response, error } = await client.POST("/logout");
      if (error || !response.ok) throw Error("Logout failed");
    },
    onSuccess: () => {
      authStore.$reset();
      router.push("/");
    },
  });

  return {
    loginUserMutation,
    signupUserMutation,
    refreshUserMutation,
    logoutMutation,
  };
}
