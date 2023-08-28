import React from "react";

import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";

import { DisplayPokemon, Pokemon } from "@/features/pokemons";
import {
  PokedexType,
  PokedexTypeChoices,
  usePokedexPageGet,
  usePokedexPageUpdate,
} from "@/features/userPokedex";
import { useUser } from "@/features/users";

const PokedexRow: React.FC<{
  pokemon: Pokemon;
  isExtra: boolean;
  userId: string;
}> = (props) => {
  const { pokemon, isExtra, userId } = props;

  const { userPokedex } = usePokedexPageGet(userId, pokemon);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId
  );

  const handleUpdatePage = (pokedexType: PokedexType, newVal: boolean) => {
    if (!isPageUpdateLoading) {
      mutatePageUpdate({ pokedexType, newVal });
    }
  };

  return (
    <>
      {userPokedex && (
        <HStack w="100%" h="62px" spacing="0px">
          <Box
            flex={2}
            h="100%"
            color={isExtra ? "red" : "black"}
            textAlign="center"
            borderWidth="0.5px"
            borderColor="gray.500"
            bgColor={isExtra ? "#DDDDDD" : "#FFFFFF"}
          >
            <Text h="16px" mb="-14px" fontSize="8pt" textAlign="left">
              {pokemon.dexNo}
            </Text>
            <Center pos="relative" top="0px">
              <Image h="45px" alt={pokemon.name} src={pokemon.getImage()} />
            </Center>
            <Text h="16px" mt="-1px" fontSize="10px">
              {pokemon.name}
            </Text>
          </Box>
          {PokedexTypeChoices.map((pokedexType: PokedexType) => {
            if (!pokemon.isImplemented(pokedexType)) {
              return (
                <Box
                  key={pokedexType}
                  flex={1}
                  h="100%"
                  borderWidth="0.5px"
                  borderColor="gray.500"
                  bgColor="gray"
                  onClick={() => undefined}
                />
              );
            } else {
              return (
                <Box
                  key={pokedexType}
                  flex={1}
                  h="100%"
                  textAlign="center"
                  borderWidth="0.5px"
                  borderColor="gray.500"
                  bgColor={
                    userPokedex.isHaving[pokedexType] ? "#bff5cd" : "white"
                  }
                  onClick={() => {
                    handleUpdatePage(
                      pokedexType,
                      !userPokedex.isHaving[pokedexType]
                    );
                  }}
                />
              );
            }
          })}
        </HStack>
      )}
    </>
  );
};

export const PokedexListTable: React.FC<{
  displayPokemons: DisplayPokemon[];
}> = (props) => {
  const { displayPokemons } = props;
  const { user } = useUser();
  return (
    <>
      {user && (
        <>
          {displayPokemons.map(({ pokemon, isExtra, uniqueKey }, idx) => {
            return (
              <PokedexRow
                pokemon={pokemon}
                isExtra={isExtra}
                userId={user.uid}
                key={`PokedexRow-${uniqueKey}`}
              />
            );
          })}
        </>
      )}
    </>
  );
};
