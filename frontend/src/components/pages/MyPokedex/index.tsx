import { FC } from "react";
import React, { useState } from "react";

import { VStack } from "@chakra-ui/react";

import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import {
  PokemonDisplayOptionBasic,
  PokemonDisplayOptionDetail,
} from "@/components/projects/PokemonDisplayOption";
import { FilteringOption } from "@/features/pokemons";
import { DefaultFilteringOption } from "@/features/pokemons/model/filtering";

export const MyPokedex: FC = () => {
  const [pokemonFilterOption, setPokemonFilterOption] =
    useState<FilteringOption>({
      ...DefaultFilteringOption,
      generation: 1,
    });

  return (
    <VStack w="100%" h="100%">
      <PokemonDisplayOptionBasic
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
      <PokedexTable filteringOption={pokemonFilterOption} />
      <PokemonDisplayOptionDetail
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
    </VStack>
  );
};
