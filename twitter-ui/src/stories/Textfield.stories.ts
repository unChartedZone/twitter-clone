import { composeStories, type Meta, type StoryObj } from "@storybook/vue3";
import "@/styles/_typography.scss";
import Textfield from "@/components/common/Textfield.vue";

const meta = {
  title: "Example/Textfield",
  component: Textfield,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "rounded", "ghost"],
    },
  },
  args: {},
  render: (args: any) => ({
    components: { Textfield },
    setup() {
      return { args };
    },
    template: `<div><Textfield v-bind="args" /></div>`,
  }),
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
  },
};
