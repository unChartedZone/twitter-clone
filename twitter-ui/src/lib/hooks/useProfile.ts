import { authClient } from "@/api/client";
import { useQuery } from "@tanstack/vue-query";
import type { UserResponse } from "../types/responses";
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";

export default function useProfile(username: MaybeRefOrGetter<string>) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await authClient.get<UserResponse>(
        `/users/${toValue(username)}`,
      );
      return res.data.user;
    },
    enabled: () => !!toValue(username),
  });

  return {
    user,
    isLoading,
  };
}
