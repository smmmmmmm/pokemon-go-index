import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { PokemonFilteringOption } from "@/features/pokemons";
import { DefaultPokemonFilteringOption } from "@/features/pokemons/model/filtering";

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

export const Default: StoryObj<T> = {
  args: {},
  render: function Comp({ ...args }) {
    const [pokemonFilterOption, setPokemonFilterOption] =
      useState<PokemonFilteringOption>({
        ...DefaultPokemonFilteringOption,
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
