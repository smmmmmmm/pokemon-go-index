import { FC, useState } from "react";
import React from "react";

import { Box, Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";

import { RegionSelect } from "@/components/projects/RegionSelect";
import { PokemonFilteringOption } from "@/features/pokemons";
import { hiraToKata } from "@/utils/hiraToKata";

/**
 * presentational component
 */
export const PokemonDisplayOptionBasicPresenter: FC<{
  pokemonFilterOption: PokemonFilteringOption;
  setPokemonFilterOption: React.Dispatch<
    React.SetStateAction<PokemonFilteringOption>
  >;
}> = (props) => {
  const { pokemonFilterOption, setPokemonFilterOption } = props;

  const partialUpdatePokemonFilteringOption = (
    p: Partial<PokemonFilteringOption>
  ) => {
    setPokemonFilterOption({ ...pokemonFilterOption, ...p });
  };

  const [inputSearchName, setInputSearchName] = useState<string>("");

  return (
    <HStack w="100%" spacing="20px">
      <Box w="30%">
        <RegionSelect
          generation={pokemonFilterOption.generation ?? 1}
          handleChange={(v: number) => {
            partialUpdatePokemonFilteringOption({ generation: v });
          }}
        />
      </Box>
      <Input
        flex={1}
        h="30px"
        p={2}
        id="select-name"
        onChange={(v) => {
          setInputSearchName(v.target.value);
          partialUpdatePokemonFilteringOption({
            searchNameKata: hiraToKata(v.target.value),
          });
        }}
        placeholder="名前で検索"
        rounded="6"
        size="small"
        value={inputSearchName}
      />
    </HStack>
  );
};

/**
 * container component
 */
export const PokemonDisplayOptionBasicContainer: FC<{
  pokemonFilterOption: PokemonFilteringOption;
  setPokemonFilterOption: React.Dispatch<
    React.SetStateAction<PokemonFilteringOption>
  >;
}> = (props) => {
  return <PokemonDisplayOptionBasicPresenter {...props} />;
};

export const PokemonDisplayOptionBasic = PokemonDisplayOptionBasicContainer;
