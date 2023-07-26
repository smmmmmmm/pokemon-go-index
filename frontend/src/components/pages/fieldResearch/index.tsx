import React, { FC } from "react";

import {
  Box,
  CircularProgress,
  Divider,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  AddFieldResearch,
  DeleteFieldResearch,
  UpdateFieldResearch,
} from "@/components/pages/fieldResearch/components/EditFieldResearch";
import {
  AddFieldResearchGroup,
  DeleteFieldResearchGroup,
  UpdateFieldResearchGroup,
} from "@/components/pages/fieldResearch/components/EditFieldResearchGroup";
import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import { GroupedSelect, Select } from "@/components/uiParts/Select";
import { FieldResearch } from "@/features/fieldResearch";
import { useFieldResearch } from "@/features/fieldResearch/hooks/useFieldResarch";

export const FieldResearchComponent: FC = () => {
  const {
    // Field Research Group
    allFieldResearchGroups,
    allFieldResearchGroupsIsLoading,
    selectFieldResearchGroup,
    setSelectFieldResearchGroup,
    // Field Research
    groupedFieldResearchOptions,
    selectFieldResearch,
    setSelectFieldResearch,
  } = useFieldResearch();

  return (
    <>
      {allFieldResearchGroupsIsLoading && (
        <CircularProgress isIndeterminate color="green.300" />
      )}

      <VStack h="100%" w="100%" align="start">
        <HStack w="100%">
          <Heading as="h2" size="md" p={1}>
            <Text as="u" color={"blue.500"}>
              タスクグループ
            </Text>
          </Heading>
          <Spacer />
          <AddFieldResearchGroup />
          {selectFieldResearchGroup && (
            <UpdateFieldResearchGroup frg={selectFieldResearchGroup} />
          )}
          {selectFieldResearchGroup && (
            <DeleteFieldResearchGroup frg={selectFieldResearchGroup} />
          )}
        </HStack>
        <Box width="100%">
          {allFieldResearchGroups && (
            <Select
              options={allFieldResearchGroups}
              value={selectFieldResearchGroup}
              getLabel={(option) => option.title}
              onChange={setSelectFieldResearchGroup}
            />
          )}
        </Box>

        <Divider />

        <HStack w="100%">
          <Heading as="h2" size="md" p={1}>
            <Text as="u" color={"blue.500"}>
              タスク
            </Text>
          </Heading>
          <Spacer />
          {selectFieldResearchGroup && (
            <AddFieldResearch frg={selectFieldResearchGroup} />
          )}
          {selectFieldResearchGroup && selectFieldResearch && (
            <UpdateFieldResearch
              frg={selectFieldResearchGroup}
              fr={selectFieldResearch}
            />
          )}
          {selectFieldResearchGroup && selectFieldResearch && (
            <DeleteFieldResearch
              frg={selectFieldResearchGroup}
              fr={selectFieldResearch}
            />
          )}
        </HStack>

        <Box width="100%">
          {groupedFieldResearchOptions && (
            <GroupedSelect<FieldResearch>
              groupedOptions={groupedFieldResearchOptions}
              value={selectFieldResearch}
              getLabel={(option) => option.title}
              onChange={setSelectFieldResearch}
            />
          )}
        </Box>
        <Heading as="h2" size="md" p={1}>
          <Text as="u" color={"blue.500"}>
            獲得可能ポケモン
          </Text>
        </Heading>
        <Box flex={1} w="100%" overflow={"auto"}>
          {selectFieldResearch && (
            <PokedexTable
              pokemonIds={selectFieldResearch.getablePokemonIds}
              showExtra={true}
            />
          )}
        </Box>
      </VStack>
    </>
  );
};
