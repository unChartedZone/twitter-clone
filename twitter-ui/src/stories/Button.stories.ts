import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";

// import Button from './Button.vue';
import Button from "@/components/common/Button.vue";
import Icon from "@/components/icons/Icon.vue";
import { iconVariants } from "@/types/IconVariants";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/Button",
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    // size: { control: 'select', options: ['small', 'medium', 'large'] },
    // backgroundColor: { control: 'color' },
    loading: { control: "boolean" },
    iconVariant: { control: "select" },
  },
  args: {
    loading: false,
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template:
      '<div><Button :variant="args.variant" :loading="args.loading">Example</Button></div>',
  }),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    loading: false,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Monochrome: Story = {
  args: {
    variant: "monochrome",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    secondaryText: "Unfollow",
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        Following
      </Button>

    `,
  }),
};

export const IconFab: Story = {
  args: {
    variant: "icon",
    size: "icon",
    iconVariant: "feather",
  },
  argTypes: {
    iconVariant: {
      options: [...iconVariants],
      control: "select",
    },
  },
  render: (args: any) => ({
    components: { Button, Icon },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <Icon :variant="args.iconVariant" />
      </Button>
    `,
  }),
};

export const IconMonochrome: Story = {
  args: {
    variant: "icon-monochrome",
    size: "icon",
    iconVariant: "cross",
  },
  argTypes: {
    iconVariant: {
      options: [...iconVariants],
      control: "select",
    },
  },
  render: (args: any) => ({
    components: { Button, Icon },
    setup() {
      return { args };
    },
    template: `
      <Button :variant="args.variant" :size="args.size">
        <Icon :variant="args.iconVariant" />
      </Button>

    `,
  }),
};

export const IconGhost: Story = {
  args: {
    variant: "icon-ghost",
    size: "icon",
  },
  render: (args: any) => ({
    components: { Button, Icon },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <Icon variant="cross" />
      </Button>
    `,
  }),
};
