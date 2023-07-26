import type { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

const meta = {
  title: "shared/Button",
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

const Template: StoryFn<ButtonProps> = (props) => <Button {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  text: "Button",
  onClick: () => {},
};
