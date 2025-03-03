import { ref, watch, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";

export function useScreenSize() {
  const { width } = useWindowSize();
  const SM_SCREEN_SIZE = 639;

  const isSmallScreen = ref<boolean>(false);

  onMounted(() => {
    if (width.value <= SM_SCREEN_SIZE) {
      isSmallScreen.value = true;
    }
  });

  watch(width, (val) => {
    if (val <= SM_SCREEN_SIZE) {
      isSmallScreen.value = true;
    } else {
      isSmallScreen.value = false;
    }
  });

  return {
    isSmallScreen,
  };
}
