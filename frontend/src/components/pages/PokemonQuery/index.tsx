import { FC, useEffect } from "react";
import React from "react";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useClipboard,
} from "@chakra-ui/react";

import { usePokemonIdsQuery } from "@/features/pokemonQuery/usecase/usePokemonIdsQuery";
import { useAllPokemonsGet } from "@/features/pokemons";
import { useUser } from "@/features/users";

export const PokemonQuery: FC = () => {
  const { user } = useUser();
  const { queryPokemonIds } = usePokemonIdsQuery(user?.uid, "lucky");
  const { allPokemons } = useAllPokemonsGet();

  const {
    onCopy,
    value: query,
    setValue: setQuery,
    hasCopied,
  } = useClipboard("");

  useEffect(() => {
    if (queryPokemonIds && allPokemons) {
      const dexNos = queryPokemonIds.flatMap((pokemonId) => {
        return allPokemons.get(pokemonId)?.dexNo ?? [];
      });
      return setQuery(dexNos.join(","));
    } else {
      return setQuery("");
    }
  }, [queryPokemonIds, allPokemons, setQuery]);

  return (
    <VStack w="100%" h="100%" px="10px">
      <Heading as="h2" size="md" p={1} alignSelf={"start"}>
        <Text as="u" color={"blue.500"}>
          条件
        </Text>
      </Heading>
      <Heading as="h2" size="md" p={1} alignSelf={"start"}>
        <Text as="u" color={"blue.500"}>
          検索文字列
        </Text>
      </Heading>
      <Box w="90%" h="50px" overflow={"auto"}>
        <Text overflowWrap="anywhere">{query}</Text>
      </Box>
      <Button w="90%" h="60px" onClick={onCopy} whiteSpace="unset">
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </VStack>
  );
};
