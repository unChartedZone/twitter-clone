import { ref, onMounted, onUnmounted } from "vue";

export function useIsBottom() {
  const isBottom = ref<boolean>(false);

  function handleScroll() {
    const offset = 80; // magic number

    // Calculate if the user is at the bottom
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    isBottom.value = scrollPosition + offset >= pageHeight;
  }

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isBottom };
}
