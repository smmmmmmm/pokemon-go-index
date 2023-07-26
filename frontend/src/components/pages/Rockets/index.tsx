import React, { FC, useEffect, useState } from "react";

import { Box, CircularProgress, Heading, Text, VStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import { RocketMember, useFetchAllRockets } from "@/features/rockets";

export const Rockets: FC = (props) => {
  const { allRockets, allRocketsIsLoading } = useFetchAllRockets();

  const [selectRocket, setSelectRocket] = useState<RocketMember>();

  // Set Initial State
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
        <CircularProgress isIndeterminate color="green.300" />
      )}

      <VStack h="100%" w="100%" align="start">
        {allRockets && (
          <Box px={3} w="100%">
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
              as="h2"
              size="md"
              key={"head-" + selectRocket.rocketMemberId}
              p={1}
            >
              <Text as="u" color={"blue.500"}>
                獲得可能ポケモン
              </Text>
            </Heading>
            <PokedexTable
              key={"table-" + selectRocket.rocketMemberId}
              pokemonIds={selectRocket.getablePokemonIds}
              showExtra={true}
            />
          </>
        )}
      </VStack>
    </>
  );
};
