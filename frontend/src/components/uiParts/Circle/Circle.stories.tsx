import type { Meta, StoryObj } from "@storybook/react";

import { CirclePresenter } from "./Circle";

type T = typeof CirclePresenter;

const meta = {
  title: "Circle",
  component: CirclePresenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<T>;

export default meta;

export const Default: StoryObj<T> = {
  args: {
    label: "label",
    progress: 50,
    myCount: 50,
    allCount: 100,
    lineWidth: "25",
    animate: true,
    animationDuration: "1s",
    bgColor: "#ddd",
  },
};

export const Full: StoryObj<T> = {
  args: {
    label: "label",
    progress: 100,
    myCount: 100,
    allCount: 100,
    lineWidth: "40",
    animate: true,
    animationDuration: "1s",
    bgColor: "#ddd",
  },
};

export const Zero: StoryObj<T> = {
  args: {
    label: "label",
    progress: 0,
    myCount: 0,
    allCount: 100,
    lineWidth: "25",
    animate: true,
    animationDuration: "1s",
    bgColor: "#ddd",
  },
};
