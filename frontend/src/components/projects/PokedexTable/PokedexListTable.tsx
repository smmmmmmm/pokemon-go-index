import React from "react";

import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";

import { Pokemon } from "@/features/pokemons";
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
        <HStack spacing="0px" h="62px" w="100%">
          <Box
            textAlign="center"
            flex={2}
            h="100%"
            borderWidth="0.5px"
            borderColor="gray.500"
            backgroundColor={isExtra ? "#DDDDDD" : "#FFFFFF"}
            color={isExtra ? "red" : "black"}
          >
            <Text fontSize="8pt" textAlign="left" h="16px" mb="-14px">
              {pokemon.dexNo}
            </Text>
            <Center top="0px" position="relative">
              <Image
                height="45px"
                src={pokemon.getImage()}
                alt={pokemon.name}
              />
            </Center>
            <Text fontSize="10px" h="16px" mt="-1px">
              {pokemon.name}
            </Text>
          </Box>
          {PokedexTypeChoices.map((key: PokedexType) => {
            if (!pokemon.isImplemented(key)) {
              return (
                <Box
                  key={key}
                  flex={1}
                  h="100%"
                  borderWidth="0.5px"
                  borderColor="gray.500"
                  backgroundColor="gray"
                  onClick={() => undefined}
                />
              );
            } else {
              return (
                <Box
                  key={key}
                  flex={1}
                  h="100%"
                  borderWidth="0.5px"
                  borderColor="gray.500"
                  textAlign="center"
                  backgroundColor={
                    userPokedex.isHaving[key] ? "#bff5cd" : "white"
                  }
                  onClick={() => {
                    handleUpdatePage(key, !userPokedex.isHaving[key]);
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
  displayPokemons: { pokemon: Pokemon; isExtra: boolean }[];
}> = (props) => {
  const { displayPokemons } = props;
  const { user } = useUser();
  return (
    <>
      {user && (
        <>
          {displayPokemons.map(({ pokemon, isExtra }) => {
            return (
              <PokedexRow
                pokemon={pokemon}
                isExtra={isExtra}
                userId={user.uid}
                key={pokemon.pokemonId}
              />
            );
          })}
        </>
      )}
    </>
  );
};
