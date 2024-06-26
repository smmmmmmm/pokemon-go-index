import React from "react";

import { Box, Center, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { FaRedhat } from "react-icons/fa";

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
  formName: string | null;
  isExtra: boolean;
  pokedexType: PokedexType;
  userId: string;
}> = (props) => {
  const { pokemon, formName, isExtra, pokedexType, userId } = props;

  const { userPokedex } = usePokedexPageGet(userId, pokemon, null);
  const { pokemonExist } = useGetPokemonExist(pokemon.pokemonId);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId,
    null
  );

  const isFormPokemon = formName !== null;

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
          pos="relative"
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
                  ? pokemon.getShinyImage(formName)
                  : pokemon.getImage(formName)
              }
              style={{ marginTop: -7 }}
            />
          </Center>
          <Text fontSize="4pt" textAlign="center">
            {pokemon.name}
          </Text>
          {isFormPokemon && (
            <Box pos="absolute" top="1px" right="1px" color="blue.600">
              <FaRedhat size={"13px"} />
            </Box>
          )}
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
          {displayPokemons.map(
            ({ pokemon, formName, isExtra, uniqueKey }, idx) => (
              <PokedexIcon
                pokemon={pokemon}
                formName={formName}
                isExtra={isExtra}
                pokedexType={pokedexType}
                userId={user.uid}
                key={`PokedexIcon-${uniqueKey}`}
              />
            )
          )}
        </SimpleGrid>
      )}
    </>
  );
};
