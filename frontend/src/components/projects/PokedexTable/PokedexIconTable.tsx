import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import { Box, Center, Image, Text } from "@chakra-ui/react";

import { Pokemon } from "@/features/pokemons";
import {
  PokedexType,
  usePokedexPageGet,
  usePokedexPageUpdate,
} from "@/features/userPokedex";
import { useUser } from "@/features/users";

export const PokedexIcon: React.FC<{
  pokemon: Pokemon;
  isExtra: boolean;
  pokedexType: PokedexType;
  userId: string;
}> = (props) => {
  const { pokemon, isExtra, pokedexType, userId } = props;

  const { userPokedex } = usePokedexPageGet(userId, pokemon);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId
  );

  const onClick = (newVal: boolean) => {
    if (
      isPageUpdateLoading ||
      !userPokedex ||
      !pokemon.isImplemented(pokedexType)
    ) {
      return;
    }
    mutatePageUpdate({ pokedexType, newVal });
  };

  return (
    <>
      {userPokedex && (
        <Box
          onClick={() => {
            onClick(!userPokedex.isHaving[pokedexType]);
          }}
          borderWidth="1px"
          borderColor="gray.500"
          color={isExtra ? "red" : "black"}
          backgroundColor={
            pokemon.isImplemented(pokedexType)
              ? userPokedex.isHaving[pokedexType]
                ? "#bff5cd"
                : "white"
              : "gray"
          }
        >
          <Text fontSize="5pt" textAlign="left">
            {pokemon.dexNo}
          </Text>
          <Center>
            <Image
              height="45"
              width="45"
              src={
                pokedexType in ["shiny", "shinyStar3"]
                  ? pokemon.getShinyImage()
                  : pokemon.getImage()
              }
              alt={pokemon.name}
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

export const PokedexIconTable: React.FC<{
  displayPokemons: { pokemon: Pokemon; isExtra: boolean }[];
  pokedexType: PokedexType;
}> = (props) => {
  const { user } = useUser();
  const { displayPokemons, pokedexType } = props;
  return (
    <>
      {user && (
        <SimpleGrid columns={5} w="100%">
          {displayPokemons.map(({ pokemon, isExtra }) => (
            <PokedexIcon
              pokemon={pokemon}
              isExtra={isExtra}
              pokedexType={pokedexType}
              userId={user.uid}
              key={pokemon.pokemonId}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
