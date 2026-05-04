import createClient from "openapi-fetch";
import type { paths } from "../../../api-schema.d.ts";
import { useAuthStore } from "@/stores/auth";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

let authTypedClientConfigured = false;

export function setupAuthTypedClient(refreshMutation: {
  mutateAsync: () => Promise<unknown>;
}) {
  if (authTypedClientConfigured) {
    return;
  }

  authTypedClientConfigured = true;
  const authStore = useAuthStore();

  client.use({
    onRequest({ request }) {
      if (authStore.accessToken) {
        request.headers.set("Authorization", `Bearer ${authStore.accessToken}`);
      }
    },
    async onResponse({ response }) {
      if (response.status === 401) {
        await refreshMutation.mutateAsync();
      }
    },
  });
}
