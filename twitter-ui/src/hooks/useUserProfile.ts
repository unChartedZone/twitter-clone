import { ref, onMounted } from "vue";
import type { LoadingState } from "@/types/LoadingState";
import type { User } from "@/models/User";
import { fetchUserByUsername } from "@/api/endpoints";

export function useUserProfile(routeUsername: string) {
  const loading = ref<LoadingState>("idle");
  const currentUser = ref<User>();

  onMounted(async () => {
    await fetchUserProfile(routeUsername);
  });

  async function fetchUserProfile(username: string) {
    loading.value = "idle";
    try {
      currentUser.value = await fetchUserByUsername(username);
      loading.value = "resolved";
    } catch (e) {
      loading.value = "rejected";
    }
  }

  return { loading, currentUser, fetchUserProfile };
}
