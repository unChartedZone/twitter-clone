import createClient from "openapi-fetch";
import type { paths } from "../../../api-schema.d.ts";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export function setupAuthTypedClient(token: string) {
  client.use({
    onRequest({ request }) {
      request.headers.set("Authorization", `Bearer ${token}`);
    },
  });
}
