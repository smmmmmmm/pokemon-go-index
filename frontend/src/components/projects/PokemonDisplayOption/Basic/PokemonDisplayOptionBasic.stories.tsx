import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FilteringOption } from "@/features/pokemons";
import { DefaultFilteringOption } from "@/features/pokemons/model/filtering";

import { PokemonDisplayOptionBasicPresenter } from "./PokemonDisplayOptionBasic";

type T = typeof PokemonDisplayOptionBasicPresenter;

const meta = {
  title: "PokemonDisplayOptionBasicPresenter",
  component: PokemonDisplayOptionBasicPresenter,
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
        ...DefaultFilteringOption,
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
