import { ref, computed, type Ref } from "vue";
import type { LoadingState } from "@/types/LoadingState";

interface QueryOptions<T> {
  initialValue: T;
}

export function useQuery<T>(query: () => Promise<T>, options: QueryOptions<T>) {
  const loadingState = ref<LoadingState>("idle");
  const result = ref<T>(options.initialValue) as Ref<T>;

  const loading = computed<boolean>(() => {
    return loadingState.value == "idle";
  });

  // Execute query function
  (async () => {
    try {
      const res = await query();
      result.value = res;
      loadingState.value = "resolved";
    } catch (e) {
      loadingState.value = "rejected";
    }
  })();

  return {
    result,
    loading,
  };
}
