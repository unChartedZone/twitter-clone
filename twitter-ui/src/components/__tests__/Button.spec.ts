import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../ui/Button.vue";
import Icon from "../icons/Icon.vue";

describe("Button", () => {
  it("renders a normal button properly", () => {
    const wrapper = mount(Button, { slots: { default: "Click Here" } });
    expect(wrapper.text()).toContain("Click Here");
  });

  it("renders a icon button properly", () => {
    const wrapper = mount(Button, {
      props: { variant: "icon", size: "icon" },
      global: {
        components: { Icon }, // Register Icon globally
      },
      slots: { default: `<Icon variant="balloon" />` },
    });

    const buttonSlot = wrapper.find("svg");

    expect(wrapper.text()).toBe("");
    expect(buttonSlot.element.tagName).toBe("svg");
  });
});
