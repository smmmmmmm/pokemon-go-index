import React, { FC, useState } from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Center,
  HStack,
  UseRadioProps,
  VStack,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

import {
  LightIcon,
  LuckyIcon,
  MaxIcon,
  NormalIcon,
  ShadowIcon,
  ShinyIcon,
  ShinyStar3Icon,
  Star3Icon,
} from "@/components/projects/Icon";
import { PokedexIconTable } from "@/components/projects/PokedexTable/PokedexIconTable";
import { PokedexListTable } from "@/components/projects/PokedexTable/PokedexListTable";
import {
  FilteringOption,
  Pokemon,
  useFilteringPokemons,
} from "@/features/pokemons";

const enum POKEDEX_TABLE_TYPE {
  LIST = "list",
  ICON_NORMAL = "normal",
  ICON_STAR3 = "star3",
  ICON_SHINY = "shiny",
  ICON_SHINY_STAR3 = "shinyStar3",
  ICON_MAX = "max",
  ICON_SHADOW = "shadow",
  ICON_LIGHT = "purify",
  ICON_LUCKY = "lucky",
}

const CustomRadio: React.FC<{
  radioProps: UseRadioProps;
  flex: number;
  icon: JSX.Element;
}> = (props) => {
  const { radioProps, flex, icon } = props;
  const { state, getInputProps, getCheckboxProps } = useRadio(radioProps);
  return (
    <Center
      as="label"
      height="30px"
      flex={flex}
      // width={width}
      bg={state.isChecked ? "blue.50" : "transparent"}
      borderWidth={state.isChecked ? "1.5px" : "1px"}
      borderColor={state.isChecked ? "blue.300" : "gray.500"}
      {...getCheckboxProps()}
    >
      <input {...getInputProps({})} hidden />
      {icon}
    </Center>
  );
};

const PokedexTableComponent: FC<{
  displayPokemons: { pokemon: Pokemon; isExtra: boolean }[];
}> = (props) => {
  const { displayPokemons } = props;

  const [pokedexType, setPokedexType] = useState<POKEDEX_TABLE_TYPE>(
    POKEDEX_TABLE_TYPE.LIST
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: POKEDEX_TABLE_TYPE.LIST,
    onChange: (v: string) => setPokedexType(v as POKEDEX_TABLE_TYPE),
  });

  const options = [
    { icon: <HamburgerIcon />, flex: 2, key: POKEDEX_TABLE_TYPE.LIST },
    {
      icon: <NormalIcon />,
      flex: 1,
      key: POKEDEX_TABLE_TYPE.ICON_NORMAL,
    },
    { icon: <Star3Icon />, flex: 1, key: POKEDEX_TABLE_TYPE.ICON_STAR3 },
    { icon: <ShinyIcon />, flex: 1, key: POKEDEX_TABLE_TYPE.ICON_SHINY },
    {
      icon: <ShinyStar3Icon />,
      flex: 1,
      key: POKEDEX_TABLE_TYPE.ICON_SHINY_STAR3,
    },
    { icon: <MaxIcon />, flex: 1, key: POKEDEX_TABLE_TYPE.ICON_MAX },
    {
      icon: <ShadowIcon />,
      flex: 1,
      key: POKEDEX_TABLE_TYPE.ICON_SHADOW,
    },
    { icon: <LightIcon />, flex: 1, key: POKEDEX_TABLE_TYPE.ICON_LIGHT },
    { icon: <LuckyIcon />, flex: 1, key: POKEDEX_TABLE_TYPE.ICON_LUCKY },
  ];

  return (
    <VStack spacing={0} overflow={"auto"} w="100%" h="100%">
      <HStack
        spacing="0px"
        position="sticky"
        top={0}
        zIndex={100}
        bgColor="white"
        w="100%"
      >
        {options.map(({ icon, flex, key }) => {
          return (
            <CustomRadio
              icon={icon}
              flex={flex}
              radioProps={{ ...getRadioProps({ value: key }) }}
              key={key}
            />
          );
        })}
      </HStack>
      {pokedexType == POKEDEX_TABLE_TYPE.LIST ? (
        <PokedexListTable displayPokemons={displayPokemons} />
      ) : (
        <PokedexIconTable
          displayPokemons={displayPokemons}
          pokedexType={pokedexType}
        />
      )}
    </VStack>
  );
};

const PokedexTableContainer: FC<{
  pokemonIds?: string[];
  filteringOption?: FilteringOption;
  showExtra?: boolean;
}> = (props) => {
  const { pokemonIds, filteringOption, showExtra } = props;

  const displayPokemons = useFilteringPokemons(
    pokemonIds,
    filteringOption,
    showExtra
  );

  return <PokedexTableComponent displayPokemons={displayPokemons} />;
};

export const PokedexTable = PokedexTableContainer;
