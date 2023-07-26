import { FC } from "react";
import React, { useState } from "react";

import { VStack } from "@chakra-ui/react";

import { MyPokedexFiltering } from "@/components/projects/PokedexTable/MyPokedexFiltering";
import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import { FilteringOption } from "@/features/pokemons";

export const MyPokedex: FC = () => {
  const [filteringOption, setFilteringOption] = useState<FilteringOption>({
    generation: 1,
  });
  const [showExtra, setShowExtra] = useState<boolean>(false);

  const partialUpdateFilteringOption = (p: Partial<FilteringOption>) => {
    setFilteringOption({ ...filteringOption, ...p });
  };

  return (
    <VStack w="100%" h="100%">
      <MyPokedexFiltering
        filteringOption={filteringOption}
        partialUpdateFilteringOption={partialUpdateFilteringOption}
        showExtra={showExtra}
        setShowExtra={setShowExtra}
      />
      <PokedexTable filteringOption={filteringOption} showExtra={showExtra} />
    </VStack>
  );
};
