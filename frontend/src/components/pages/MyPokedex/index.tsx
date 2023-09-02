import { FC } from "react";
import React, { useState } from "react";

import { VStack } from "@chakra-ui/react";

import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import {
  PokemonDisplayOptionBasic,
  PokemonDisplayOptionDetail,
} from "@/components/projects/PokemonDisplayOption";
import { PokemonFilteringOption } from "@/features/pokemons";
import { DefaultPokemonFilteringOption } from "@/features/pokemons/model/filtering";

export const MyPokedex: FC = () => {
  const [pokemonFilterOption, setPokemonFilterOption] =
    useState<PokemonFilteringOption>({
      ...DefaultPokemonFilteringOption,
      generation: 1,
    });

  return (
    <VStack w="100%" h="100%">
      <PokemonDisplayOptionBasic
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
      <PokedexTable pokemonFilteringOption={pokemonFilterOption} />
      <PokemonDisplayOptionDetail
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
    </VStack>
  );
};
