import { FC, useState } from "react";
import React from "react";

import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Collapse, Input, useBoolean } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";

import { RegionSelect } from "@/components/projects/RegionSelect";
import {
  ToggleIconButton,
  ToggleIconButtonWithText,
} from "@/components/uiParts/ToggleButton";
import { FilteringOption } from "@/features/pokemons";
import { hiraToKata } from "@/utils/hiraToKata";

export const MyPokedexFiltering: FC<{
  filteringOption: FilteringOption;
  partialUpdateFilteringOption: (p: Partial<FilteringOption>) => void;
  showExtra: boolean;
  setShowExtra: (v: boolean) => void;
}> = (props) => {
  const {
    filteringOption,
    partialUpdateFilteringOption,
    showExtra,
    setShowExtra,
  } = props;

  const [inputSearchName, setInputSearchName] = useState<string>("");
  const [isOpenDetailFilter, setIsOpenDetailFilter] = useBoolean(false);

  return (
    <>
      <HStack spacing="20px">
        <RegionSelect
          generation={filteringOption.generation ?? 1}
          handleChange={(v: number) => {
            partialUpdateFilteringOption({ generation: v });
          }}
        />
        <Input
          id="select-name"
          size="small"
          p={2}
          placeholder="名前で検索"
          height="30px"
          value={inputSearchName}
          rounded="6"
          onChange={(v) => {
            setInputSearchName(v.target.value);
            partialUpdateFilteringOption({
              searchNameKata: hiraToKata(v.target.value),
            });
          }}
        />
        <ToggleIconButton
          aria-label="Search database"
          toggle={setIsOpenDetailFilter.toggle}
          isClicked={isOpenDetailFilter}
          onIcon={<AddIcon />}
          offIcon={<MinusIcon />}
        />
      </HStack>
      <Collapse in={isOpenDetailFilter} animateOpacity>
        <Box mb={3} p={2} borderWidth={1}>
          <ToggleIconButtonWithText
            toggle={() => setShowExtra(!showExtra)}
            isClicked={showExtra}
            text="進化系を表示する"
            onIcon={<CheckIcon />}
            offIcon={<MinusIcon />}
            props={{ rounded: "10" }}
          />
        </Box>
      </Collapse>
    </>
  );
};
