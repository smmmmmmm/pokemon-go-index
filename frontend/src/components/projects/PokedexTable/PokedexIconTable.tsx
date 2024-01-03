import React from "react";

import { Box, Center, Image, SimpleGrid, Text } from "@chakra-ui/react";

import { DisplayPokemon, Pokemon } from "@/features/pokemons";
import { useGetPokemonExist } from "@/features/pokemons/usecase/useGetPokemonExist";
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
  const { pokemonExist } = useGetPokemonExist(pokemon.pokemonId);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId
  );

  const onClick = (newVal: boolean) => {
    if (
      isPageUpdateLoading ||
      !userPokedex ||
      !pokemon.isImplemented(pokedexType, pokemonExist)
    ) {
      return;
    }
    mutatePageUpdate({ pokedexType, newVal });
  };

  return (
    <>
      {userPokedex && (
        <Box
          color={isExtra ? "red" : "black"}
          borderWidth="1px"
          borderColor="gray.500"
          bgColor={
            pokemon.isImplemented(pokedexType, pokemonExist)
              ? userPokedex.isHaving[pokedexType]
                ? "#bff5cd"
                : "white"
              : "gray"
          }
          onClick={() => {
            onClick(!userPokedex.isHaving[pokedexType]);
          }}
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
                pokedexType in ["shiny", "shinyStar3"]
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

export const PokedexIconTable: React.FC<{
  displayPokemons: DisplayPokemon[];
  pokedexType: PokedexType;
}> = (props) => {
  const { user } = useUser();
  const { displayPokemons, pokedexType } = props;
  return (
    <>
      {user && (
        <SimpleGrid w="100%" columns={5}>
          {displayPokemons.map(({ pokemon, isExtra, uniqueKey }, idx) => (
            <PokedexIcon
              pokemon={pokemon}
              isExtra={isExtra}
              pokedexType={pokedexType}
              userId={user.uid}
              key={`PokedexIcon-${uniqueKey}`}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
