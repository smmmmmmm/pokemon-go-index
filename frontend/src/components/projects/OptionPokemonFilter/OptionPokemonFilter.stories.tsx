import type { Meta, StoryObj } from "@storybook/react";

import { OptionPokemonFilterPresenter } from "./OptionPokemonFilter";

type T = typeof OptionPokemonFilterPresenter;

const meta = {
  title: "OptionPokemonFilter",
  component: OptionPokemonFilterPresenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<T>;

export default meta;

export const Default: StoryObj<T> = {};
