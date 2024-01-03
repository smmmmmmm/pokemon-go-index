import React, { useState } from "react";

import {
  Box,
  Center,
  HStack,
  Image,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  Pokemon,
  PokemonFilteringOption,
  useFilteringPokemons,
} from "@/features/pokemons";
import { ExsitType } from "@/features/pokemons/model/pokemon";
import { useGetPokemonExist } from "@/features/pokemons/usecase/useGetPokemonExist";
import { useUpdatePokemonExist } from "@/features/pokemons/usecase/useUpdatePokemonExist";

export const ChangeExistPokemonIcon: React.FC<{
  pokemon: Pokemon;
  isExtra: boolean;
  existType: ExsitType;
}> = (props) => {
  const { pokemon, isExtra, existType } = props;

  const { pokemonExist } = useGetPokemonExist(pokemon.pokemonId);
  const { updatePokemonExistMutate } = useUpdatePokemonExist(
    pokemon.pokemonId,
    existType
  );

  const onClick = () => {
    if (!pokemonExist) {
      return;
    }
    updatePokemonExistMutate(!pokemonExist[existType]);
  };

  return (
    <>
      {pokemonExist && (
        <Box
          color={isExtra ? "red" : "black"}
          borderWidth="1px"
          borderColor="gray.500"
          bgColor={pokemonExist[existType] ? "#bff5cd" : "white"}
          onClick={onClick}
        >
          <Text fontSize="5pt" textAlign="left">
            {pokemon.dexNo}
          </Text>
          <Center>
            <Image
              w="45"
              h="45"
              alt={pokemon.name}
              src={
                existType === "existShiny"
                  ? pokemon.getShinyImage()
                  : pokemon.getImage()
              }
              style={{ marginTop: -7 }}
            />
          </Center>
          <Text fontSize="4pt" textAlign="center">
            {pokemon.name}
          </Text>
        </Box>
      )}
    </>
  );
};

export const ChangeExistPokemonTables: React.FC<{
  pokemonFilteringOption: PokemonFilteringOption;
}> = (props) => {
  const { pokemonFilteringOption } = props;

  const [existType, setExistType] = useState<ExsitType>("exist");

  const displayPokemons = useFilteringPokemons(
    undefined,
    pokemonFilteringOption
  );

  return (
    <VStack w="100%" h="100%" spacing={2}>
      <RadioGroup
        onChange={(e) => {
          setExistType(e as ExsitType);
        }}
        value={existType}
      >
        <HStack spacing={4}>
          <Radio value="exist">通常実装</Radio>
          <Radio value="existShiny">色違い実装</Radio>
          <Radio value="existShadow">シャドウ実装</Radio>
        </HStack>
      </RadioGroup>
      <SimpleGrid flex={1} overflow={"scroll"} w="100%" columns={5}>
        {displayPokemons.map(({ pokemon, isExtra, uniqueKey }, idx) => (
          <ChangeExistPokemonIcon
            pokemon={pokemon}
            isExtra={isExtra}
            existType={existType}
            key={`PokedexIcon-${uniqueKey}`}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
