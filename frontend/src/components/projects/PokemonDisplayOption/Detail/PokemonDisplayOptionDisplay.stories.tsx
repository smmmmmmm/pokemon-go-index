import type { Meta, StoryObj } from "@storybook/react";

import { PokemonDisplayOptionDetailPresenter } from "./PokemonDisplayOptionDisplay";

type T = typeof PokemonDisplayOptionDetailPresenter;

const meta = {
  title: "PokemonDisplayOptionDetailPresenter",
  component: PokemonDisplayOptionDetailPresenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<T>;

export default meta;

export const Default: StoryObj<T> = {};
