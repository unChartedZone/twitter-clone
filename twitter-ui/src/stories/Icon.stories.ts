import Icon from "@/components/icons/Icon.vue";
import { iconVariants } from "@/types/IconVariants";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: "Example/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [...iconVariants],
      control: "select",
    },
  },
  args: {},
  render: (args: any) => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 2rem;">
      <Icon :variant="args.variant" />
    </div>
    `,
  }),
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "bird",
  },
};
