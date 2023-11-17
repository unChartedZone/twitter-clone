import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../Button.vue";

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, { slots: { default: "Click Here" } });
    expect(wrapper.text()).toContain("Click Here");
  });
});
