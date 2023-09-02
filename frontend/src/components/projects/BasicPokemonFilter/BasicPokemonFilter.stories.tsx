import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FilteringOption } from "@/features/pokemons";

import { BasicPokemonFilterPresenter } from "./BasicPokemonFilter";

type T = typeof BasicPokemonFilterPresenter;

const meta = {
  title: "BasicPokemonFilter",
  component: BasicPokemonFilterPresenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<T>;

export default meta;

export const Default: StoryObj<T> = {
  args: {},
  render: function Comp({ ...args }) {
    const [pokemonFilterOption, setPokemonFilterOption] =
      useState<FilteringOption>({
        generation: 1,
      });
    return (
      <meta.component
        {...args}
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      ></meta.component>
    );
  },
};
