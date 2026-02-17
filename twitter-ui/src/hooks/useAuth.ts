import { useMutation } from "@tanstack/vue-query";
import { client, setupAuthClient } from "@/api/client";
import { useRouter } from "vue-router";
import { useAuthStore, type User } from "@/stores/auth";
import type {
  LoginBody,
  LoginResponse,
  RefreshResponse,
  SignupBody,
  SignupResponse,
} from "@/lib/types/responses";

export default function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();

  const loginUserMutation = useMutation({
    mutationFn: async (user: LoginBody) => {
      const result = (await client.post<LoginResponse>("/login", user)).data;
      return result;
    },
    onSuccess: async ({ user, meta }) => {
      authStore.setUserAuthState(user, meta.token);
      await setupAuthClient();
      router.push("/home");
    },
  });

  const signupUserMutation = useMutation({
    mutationFn: async (payload: SignupBody) => {
      const result = (await client.post<SignupResponse>("/signup", payload))
        .data;
      return result;
    },
    onSuccess: async ({ user, meta }) => {
      authStore.setUserAuthState(user, meta.token);
      await setupAuthClient();
      router.push("/home");
    },
  });

  const refreshUserMutation = useMutation({
    mutationFn: async () =>
      (await client.post<RefreshResponse>("/refresh")).data,
    onSuccess: async ({ user, meta }) => {
      authStore.setUserAuthState(user, meta.token);
      await setupAuthClient();
    },
    onError: () => {},
  });

  return {
    loginUserMutation,
    signupUserMutation,
    refreshUserMutation,
  };
}
