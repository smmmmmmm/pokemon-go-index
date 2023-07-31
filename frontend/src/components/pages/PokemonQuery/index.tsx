import React, { FC, useEffect, useState } from "react";

import { CheckIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useClipboard,
} from "@chakra-ui/react";

import { Select } from "@/components/uiParts/Select";
import { ToggleIconButtonWithText } from "@/components/uiParts/ToggleButton";
import { usePokemonIdsQuery } from "@/features/pokemonQuery/usecase/usePokemonIdsQuery";
import { useAllPokemonsGet } from "@/features/pokemons";
import {
  GetPokedexTypeLabel,
  PokedexType,
  PokedexTypeChoices,
} from "@/features/userPokedex";
import { useUser } from "@/features/users";

interface SearchQuery {
  // pokedex conditions
  pokedexType: PokedexType;
  pokedexTypeCondition: boolean;

  // exclude conditions
  excludeSpecial: boolean;
  excludeShiny: boolean;
  excludeLucky: boolean;
  excludeMAX: boolean;
  excludeXXL: boolean;
  excludeXXS: boolean;
}

export const PokemonQuery: FC = () => {
  const { user } = useUser();
  const { allPokemons } = useAllPokemonsGet();
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    pokedexType: "lucky",
    pokedexTypeCondition: true,
    excludeSpecial: true,
    excludeShiny: true,
    excludeLucky: true,
    excludeMAX: true,
    excludeXXL: true,
    excludeXXS: true,
  });

  const {
    onCopy,
    value: query,
    setValue: setQuery,
    hasCopied,
  } = useClipboard("");

  // 検索文字列の作成
  const { queryPokemonIds } = usePokemonIdsQuery(
    searchQuery.pokedexType,
    searchQuery.pokedexTypeCondition,
    user?.uid
  );
  useEffect(() => {
    if (queryPokemonIds && allPokemons) {
      const dexNos = queryPokemonIds.flatMap((pokemonId) => {
        return allPokemons.get(pokemonId)?.dexNo ?? [];
      });
      dexNos.sort((a, b) => a - b);
      let q = "(" + dexNos.join(",") + ")";
      if (searchQuery.excludeXXS) {
        q = "!XXS&" + q;
      }
      if (searchQuery.excludeXXL) {
        q = "!XXL&" + q;
      }
      if (searchQuery.excludeMAX) {
        q = "!4*&" + q;
      }
      if (searchQuery.excludeSpecial) {
        q = "!とくべつ&" + q;
      }
      if (searchQuery.excludeShiny) {
        q = "!色違い&" + q;
      }
      if (searchQuery.excludeLucky) {
        q = "!キラ&" + q;
      }
      setQuery(q);
    }
  }, [queryPokemonIds, allPokemons, setQuery, searchQuery]);

  return (
    <VStack w="100%" h="100%" px="10px">
      <Heading as="h2" size="md" p={1} alignSelf={"start"}>
        <Text as="u" color={"blue.500"}>
          条件
        </Text>
      </Heading>
      <Heading as="h3" size="sm" p={1} alignSelf={"start"}>
        図鑑状況
      </Heading>
      <HStack>
        <Select
          options={PokedexTypeChoices}
          value={searchQuery.pokedexType}
          getLabel={GetPokedexTypeLabel}
          onChange={(v) =>
            setSearchQuery((old) => ({ ...old, pokedexType: v }))
          }
        />
        <>が</>
        <Select
          options={[true, false]}
          value={searchQuery.pokedexTypeCondition}
          getLabel={(v) => (v ? "埋まっている" : "埋まってない")}
          onChange={(v) =>
            setSearchQuery((old) => ({ ...old, pokedexTypeCondition: v }))
          }
        />
      </HStack>
      <Heading as="h3" size="sm" p={1} alignSelf={"start"}>
        除外する
      </Heading>
      <SimpleGrid minChildWidth="90px" spacing="10px" w="100%">
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeLucky: !old.excludeLucky,
            }))
          }
          isClicked={searchQuery.excludeLucky}
          text="キラ"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeShiny: !old.excludeShiny,
            }))
          }
          isClicked={searchQuery.excludeShiny}
          text="色違い"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeSpecial: !old.excludeSpecial,
            }))
          }
          isClicked={searchQuery.excludeSpecial}
          text="特別"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeMAX: !old.excludeMAX,
            }))
          }
          isClicked={searchQuery.excludeMAX}
          text="評価MAX"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeXXL: !old.excludeXXL,
            }))
          }
          isClicked={searchQuery.excludeXXL}
          text="XXL"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
        <ToggleIconButtonWithText
          toggle={() =>
            setSearchQuery((old) => ({
              ...old,
              excludeXXS: !old.excludeXXS,
            }))
          }
          isClicked={searchQuery.excludeXXS}
          text="XXS"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
      </SimpleGrid>
      <Heading as="h2" size="md" p={1} alignSelf={"start"}>
        <Text as="u" color={"blue.500"}>
          検索文字列
        </Text>
      </Heading>
      <Button w="90%" h="80px" onClick={onCopy} whiteSpace="unset">
        {hasCopied ? "Copied!" : "Copy to Clipboard"}
      </Button>
      <Box w="90%" flex={1} overflow={"auto"}>
        <Text overflowWrap="anywhere" color="gray.600">
          {query}
        </Text>
      </Box>
    </VStack>
  );
};
