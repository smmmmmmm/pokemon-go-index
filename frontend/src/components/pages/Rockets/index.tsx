import React, { FC, useEffect, useState } from "react";

import { Box, CircularProgress, Heading, Text, VStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import { PokemonDisplayOptionDetail } from "@/components/projects/PokemonDisplayOption";
import { PokemonFilteringOption } from "@/features/pokemons";
import { DefaultPokemonFilteringOption } from "@/features/pokemons/model/filtering";
import { RocketMember, useFetchAllRockets } from "@/features/rockets";

export const Rockets: FC = (props) => {
  const { allRockets, allRocketsIsLoading } = useFetchAllRockets();

  const [selectRocket, setSelectRocket] = useState<RocketMember>();

  // Set Initial State
  const [pokemonFilterOption, setPokemonFilterOption] =
    useState<PokemonFilteringOption>(DefaultPokemonFilteringOption);

  useEffect(() => {
    if (allRockets && selectRocket === undefined) {
      setSelectRocket(allRockets[0]);
    }
  }, [allRockets, selectRocket]);

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {allRocketsIsLoading && (
        <CircularProgress color="green.300" isIndeterminate />
      )}

      <VStack align="start" w="100%" h="100%">
        {allRockets && (
          <Box w="100%" px={3}>
            {isClient && (
              <Select
                options={allRockets}
                value={selectRocket}
                getOptionLabel={(option) => option.type}
                getOptionValue={(option) => option.rocketMemberId}
                onChange={(option) => setSelectRocket(option as RocketMember)}
                size={"sm"}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
              />
            )}
          </Box>
        )}
        {selectRocket && (
          <>
            <Heading
              key={"head-" + selectRocket.rocketMemberId}
              as="h2"
              p={1}
              size="md"
            >
              <Text as="u" color={"blue.500"}>
                獲得可能ポケモン
              </Text>
            </Heading>
            <PokedexTable
              key={"table-" + selectRocket.rocketMemberId}
              pokemonIds={selectRocket.getablePokemonIds}
              pokemonFilteringOption={pokemonFilterOption}
            />
          </>
        )}

        <PokemonDisplayOptionDetail
          pokemonFilterOption={pokemonFilterOption}
          setPokemonFilterOption={setPokemonFilterOption}
        />
      </VStack>
    </>
  );
};
