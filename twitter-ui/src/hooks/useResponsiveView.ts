import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useScreenSize } from "./useScreenSize";

function useResponsiveView(fallbackRoute: string) {
  const router = useRouter();
  const route = useRoute();
  const { isSmallScreen } = useScreenSize();

  const isParentRoute = computed(() => {
    const singleRoute = route.matched.length === 1;
    const nestedRoute =
      route.matched.length === 2 &&
      route.matched[0].path === route.matched[1].path;

    return singleRoute || nestedRoute;
  });

  onMounted(() => {
    if (!isSmallScreen.value) {
      router.replace({ name: fallbackRoute });
    }
  });

  // Watch for change of screen size. If user is on root page and screen
  // is bigger than sm then we want to redirect to fallback route
  watch([isParentRoute, isSmallScreen], ([ipr, iss], _oldVal) => {
    if (ipr && !iss) router.push({ name: fallbackRoute });
  });

  return {
    isParentRoute,
  };
}

export default useResponsiveView;
