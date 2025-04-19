import PageLoader from "@/components/loaders/PageLoader.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: "Example/Page Loader",
  component: PageLoader,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  render: (args: any) => ({
    components: { PageLoader },
    setup() {
      return { args };
    },
    template: "<div><PageLoader /></div>",
  }),
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
