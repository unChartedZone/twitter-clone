import { ref, onMounted } from "vue";
import type { LoadingState } from "@/types/LoadingState";
import type { BaseUser } from "@/models/User";
import { fetchUserByUsername } from "@/api/endpoints";

export function useUserProfile(username: string) {
  const loading = ref<LoadingState>("idle");
  const currentUser = ref<BaseUser>();

  onMounted(async () => {
    await fetchUserProfile();
  });

  async function fetchUserProfile() {
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