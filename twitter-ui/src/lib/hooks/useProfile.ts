import { client } from "@/lib/api/client";
import { useQuery } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";

export default function useProfile(username: MaybeRefOrGetter<string>) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await client.GET("/users/{username}", {
        params: { path: { username: toValue(username) } },
      });
      return res.data?.user;
    },
    enabled: () => !!toValue(username),
  });

  return {
    user,
    isLoading,
  };
}
