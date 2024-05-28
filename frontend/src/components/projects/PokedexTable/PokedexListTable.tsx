import React from "react";

import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Text,
  VStack,
  useBoolean,
} from "@chakra-ui/react";
import { FaRedhat } from "react-icons/fa";

import { DisplayPokemon, Pokemon } from "@/features/pokemons";
import { PokemonForm } from "@/features/pokemons/model/pokemon";
import { useGetPokemonExist } from "@/features/pokemons/usecase/useGetPokemonExist";
import {
  PokedexType,
  PokedexTypeChoices,
  usePokedexPageGet,
  usePokedexPageUpdate,
} from "@/features/userPokedex";
import { useUser } from "@/features/users";

const FormPokedexRow: React.FC<{
  pokemon: Pokemon;
  pokemonForm: PokemonForm;
  userId: string;
}> = (props) => {
  const { pokemon, pokemonForm, userId } = props;

  const { userPokedex } = usePokedexPageGet(
    userId,
    pokemon,
    pokemonForm.formName
  );
  const { pokemonExist } = useGetPokemonExist(pokemon.pokemonId);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId,
    pokemonForm.formName
  );

  const handleUpdatePage = (pokedexType: PokedexType, newVal: boolean) => {
    if (!isPageUpdateLoading) {
      mutatePageUpdate({ pokedexType, newVal });
    }
  };

  return (
    <>
      {userPokedex && (
        <HStack key={pokemonForm.formName} w="100%" h="50px" spacing="0px">
          <Divider flex={0.28} orientation="vertical" />
          <Box
            pos="relative"
            flex={1.7}
            h="100%"
            color={"black"}
            textAlign="center"
            borderWidth="0.5px"
            borderColor="gray.500"
            bgColor={"#FFFFFF"}
          >
            <Center pos="relative" top="0px">
              <Image h="45px" alt={pokemon.name} src={pokemonForm.getImage()} />
            </Center>
            <Box pos="absolute" top="1px" right="1px" color="blue.600">
              <FaRedhat size={"13px"} />
            </Box>
          </Box>
          {PokedexTypeChoices.map((pokedexType: PokedexType) => {
            if (!pokemon.isImplemented(pokedexType, pokemonExist)) {
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

const PokedexRow: React.FC<{
  pokemon: Pokemon;
  formName: string | null;
  isExtra: boolean;
  userId: string;
}> = (props) => {
  const { pokemon, formName, isExtra, userId } = props;

  const { userPokedex } = usePokedexPageGet(userId, pokemon, formName);
  const { pokemonExist } = useGetPokemonExist(pokemon.pokemonId);
  const { mutatePageUpdate, isPageUpdateLoading } = usePokedexPageUpdate(
    userId,
    pokemon.pokemonId,
    formName
  );
  const [isExpandForms, setIsExpandForms] = useBoolean(false);

  const isFormPokemon = formName !== null;
  const enableExpandForm = pokemon.forms.length > 0 && !isFormPokemon;

  const handleUpdatePage = (pokedexType: PokedexType, newVal: boolean) => {
    if (!isPageUpdateLoading) {
      mutatePageUpdate({ pokedexType, newVal });
    }
  };

  const handleChangeExpandForm = () => {
    if (enableExpandForm) {
      setIsExpandForms.toggle();
    }
  };

  return (
    <>
      {userPokedex && (
        <VStack w="100%" spacing="0px">
          <HStack w="100%" h="62px" spacing="0px">
            <Box
              pos="relative"
              flex={2}
              h="100%"
              color={isExtra ? "red" : "black"}
              textAlign="center"
              borderWidth="0.5px"
              borderColor="gray.500"
              bgColor={isExtra ? "#DDDDDD" : "#FFFFFF"}
              onClick={handleChangeExpandForm}
            >
              <Text h="16px" mb="-14px" fontSize="8pt" textAlign="left">
                {pokemon.dexNo}
              </Text>
              <Center pos="relative" top="0px">
                <Image
                  h="45px"
                  alt={pokemon.name}
                  src={pokemon.getImage(formName)}
                />
              </Center>
              <HStack w="100%" h="16px" mt="-1px">
                <Text w="100%" fontSize="10px">
                  {pokemon.name}
                </Text>
              </HStack>{" "}
              {isFormPokemon && (
                <Box pos="absolute" top="1px" right="1px" color="blue.600">
                  <FaRedhat size={"13px"} />
                </Box>
              )}
              {enableExpandForm && (
                <>
                  {isExpandForms ? (
                    <ChevronDownIcon
                      boxSize={4}
                      position="absolute"
                      bottom="1px"
                      left="1px"
                      color="blue.600"
                    />
                  ) : (
                    <ChevronRightIcon
                      boxSize={4}
                      position="absolute"
                      bottom="1px"
                      left="1px"
                      color="blue.600"
                    />
                  )}
                </>
              )}
            </Box>
            {PokedexTypeChoices.map((pokedexType: PokedexType) => {
              if (!pokemon.isImplemented(pokedexType, pokemonExist)) {
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
          {isExpandForms && (
            <HStack w="100%">
              <VStack w="100%" spacing="0px">
                {pokemon.forms &&
                  pokemon.forms.map((pokemonForm) => (
                    <FormPokedexRow
                      pokemon={pokemon}
                      pokemonForm={pokemonForm}
                      userId={userId}
                      key={pokemonForm.formName}
                    />
                  ))}
              </VStack>
            </HStack>
          )}
        </VStack>
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
          {displayPokemons.map(
            ({ pokemon, formName, isExtra, uniqueKey }, idx) => {
              return (
                <PokedexRow
                  pokemon={pokemon}
                  formName={formName}
                  isExtra={isExtra}
                  userId={user.uid}
                  key={`PokedexRow-${uniqueKey}`}
                />
              );
            }
          )}
        </>
      )}
    </>
  );
};
