import { FC, useState } from "react";

import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack, useBoolean } from "@chakra-ui/react";

import { ChangeExistPokemonTables } from "@/components/pages/MyPokedex/ChangeExistPokemon";
import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import {
  PokemonDisplayOptionBasic,
  PokemonDisplayOptionDetail,
} from "@/components/projects/PokemonDisplayOption";
import { SimpleToggleIconButton } from "@/components/uiParts/ToggleIconButton";
import { PokemonFilteringOption } from "@/features/pokemons";
import { DefaultPokemonFilteringOption } from "@/features/pokemons/model/filtering";
import { useUser } from "@/features/users";

export const MyPokedex: FC = () => {
  const [pokemonFilterOption, setPokemonFilterOption] =
    useState<PokemonFilteringOption>({
      ...DefaultPokemonFilteringOption,
      generation: 1,
    });

  const { isAdmin } = useUser();
  const [isEdit, setIsEdit] = useBoolean(false);

  return (
    <VStack w="100%" h="100%">
      <HStack w="100%">
        <Box flex={1}>
          <PokemonDisplayOptionBasic
            pokemonFilterOption={pokemonFilterOption}
            setPokemonFilterOption={setPokemonFilterOption}
          />
        </Box>
        {isAdmin && (
          <SimpleToggleIconButton
            toggle={setIsEdit.toggle}
            isOn={isEdit}
            onIcon={<CheckIcon />}
            offIcon={<EditIcon />}
          />
        )}
      </HStack>
      <Box flex={1} overflow={"hidden"} w="100%">
        {isEdit ? (
          <ChangeExistPokemonTables
            pokemonFilteringOption={pokemonFilterOption}
          />
        ) : (
          <PokedexTable pokemonFilteringOption={pokemonFilterOption} />
        )}
      </Box>
      <PokemonDisplayOptionDetail
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
    </VStack>
  );
};
