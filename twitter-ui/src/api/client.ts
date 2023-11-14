import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function setupAuthClient() {
  const authStore = useAuthStore();

  // Setup auth client to always attach access token to requests that require it
  authClient.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    }

    return config;
  });

  // If response fails with a 401 then we try to refresh user session
  authClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status == 401) {
        await authStore.refreshUser();
      }
      return Promise.reject(error);
    }
  );
}
