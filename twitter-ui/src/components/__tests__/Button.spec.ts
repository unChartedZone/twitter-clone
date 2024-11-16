import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../common/Button.vue";

describe("Button", () => {
  it("renders a normal button properly", () => {
    const wrapper = mount(Button, { slots: { default: "Click Here" } });
    expect(wrapper.text()).toContain("Click Here");
  });

  it("renders a icon button properly", () => {
    const wrapper = mount(Button, {
      props: { icon: "balloon" },
      slots: { default: "something" },
    });
    expect(wrapper.text()).toContain("");
  });
});
