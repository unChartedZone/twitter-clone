import { ref, onMounted, onUnmounted } from "vue";

export function useIsBottom() {
  const isBottom = ref<boolean>(false);

  function handleScroll() {
    // Calculate if the user is at the bottom
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    isBottom.value = scrollPosition >= pageHeight;
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isBottom };
}
