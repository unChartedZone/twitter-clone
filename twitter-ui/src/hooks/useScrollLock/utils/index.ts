export function getScrollWidth() {
  if (typeof window === "undefined" || typeof document === "undefined")
    return 0;

  const paddingRight = parseInt(
    window.getComputedStyle(document.body).paddingRight,
    10
  );
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  return paddingRight + scrollbarWidth;
}

export const getLockStyles = ({
  disableBodyPadding,
}: {
  disableBodyPadding: boolean;
}) => {
  const scrollWidth = disableBodyPadding ? null : getScrollWidth();

  const styles = `body {
        --removed-scroll-width: ${scrollWidth}px;
        touch-action: none;
        overflow: hidden !important;
        position: relative !important;
        ${
          scrollWidth
            ? "padding-right: var(--removed-scroll-width) !important;"
            : ""
        }
        `;

  return styles;
};

export function makeStyleTag() {
  const tag = document.createElement("style");
  tag.setAttribute("mantine-scroll-lock", "");

  return tag;
}

export function injectStyles(tag: any, css: string): void {
  if (tag.styleSheet) {
    // eslint-disable-next-line no-param-reassign
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}

export function insertStyleTag(tag: Node) {
  const head = document.head || document.getElementsByTagName("head")[0];

  head.appendChild(tag);
}
