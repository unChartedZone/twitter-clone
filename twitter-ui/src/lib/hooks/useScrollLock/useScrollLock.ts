import { ref, watch } from "vue";
import {
  getLockStyles,
  injectStyles,
  insertStyleTag,
  makeStyleTag,
} from "./utils/index";

export function useScrollLock(props: any) {
  const stylesheet = ref<HTMLStyleElement | null>(null);

  function lockScroll() {
    const styles = getLockStyles({ disableBodyPadding: false });
    const sheet = makeStyleTag();
    injectStyles(sheet, styles);
    insertStyleTag(sheet);
    stylesheet.value = sheet;
  }

  function unlockScroll() {
    if (!stylesheet.value) return;
    stylesheet.value.parentNode?.removeChild(stylesheet.value);
    stylesheet.value = null;
  }

  watch(
    () => props.modelValue,
    (newModelValue, _) => {
      if (newModelValue) {
        lockScroll();
      } else {
        unlockScroll();
      }
    }
  );

  return { lockScroll, unlockScroll };
}
