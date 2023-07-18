import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

const StorybookWrapper = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Navbar />
    </Provider>
  </BrowserRouter>
);

const meta = {
  title: "widgets/Navbar",
  component: StorybookWrapper,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Navbar",
  },
};
