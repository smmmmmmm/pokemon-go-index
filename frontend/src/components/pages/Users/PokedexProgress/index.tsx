import { FC, useMemo, useState } from "react";
import React from "react";

import {
  Box,
  Center,
  CircularProgress,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { RegionSelect } from "@/components/projects/RegionSelect";
import { Circle } from "@/components/uiParts/Circle";
import { Pokemon, useAllPokemonsGet } from "@/features/pokemons";
import { useUser } from "@/features/users";
import { useUserPokedexProgress } from "@/features/users/usecase/useCountProgress";

const PokedexCircle: FC<{
  label: string;
  myCount: number;
  allCount: number;
}> = (props) => {
  const { label, myCount, allCount } = props;

  return (
    <>
      <Circle
        label={label}
        myCount={myCount}
        allCount={allCount}
        lineWidth="40px"
        animate={true}
      />
    </>
  );
};

export const PokedexProgress: FC = () => {
  const [generation, setGeneration] = useState<number>(1);
  const { user } = useUser();

  const { allPokemons, isLoading } = useAllPokemonsGet();

  const { userPokedexProgress, userPokedexProgressIsLoading } =
    useUserPokedexProgress(user?.uid, generation);

  const pokedexProgress = useMemo(() => {
    if (allPokemons && userPokedexProgress) {
      const pokemons: Pokemon[] = Array.from(allPokemons.values());
      const filteredPokemons = pokemons.filter(
        (pokemon) => pokemon.generation == generation
      );
      return {
        normal: {
          myCount: userPokedexProgress.normal,
          allCount: filteredPokemons.length,
        },
        star3: {
          myCount: userPokedexProgress.star3,
          allCount: filteredPokemons.length,
        },
        shiny: {
          myCount: userPokedexProgress.shiny,
          allCount: filteredPokemons.filter((pokemon) => pokemon.existShiny)
            .length,
        },
        shinyStar3: {
          myCount: userPokedexProgress.shinyStar3,
          allCount: filteredPokemons.filter((pokemon) => pokemon.existShiny)
            .length,
        },
        max: {
          myCount: userPokedexProgress.max + 3,
          allCount: filteredPokemons.length,
        },
        shadow: {
          myCount: userPokedexProgress.shadow,
          allCount: filteredPokemons.filter((pokemon) => pokemon.existShiny)
            .length,
        },
        purify: {
          myCount: userPokedexProgress.purify,
          allCount: filteredPokemons.filter((pokemon) => pokemon.existShiny)
            .length,
        },
        lucky: {
          myCount: userPokedexProgress.lucky,
          allCount: filteredPokemons.length,
        },
      };
    }
  }, [allPokemons, generation, userPokedexProgress]);

  return (
    <>
      <VStack align="start" w="100%" h="100%" spacing={5}>
        <HStack w="100%" pr={"15px"}>
          <Heading as="h2" flex={1} p={1} size="md">
            <Text as="u" color={"blue.500"}>
              図鑑進捗
            </Text>
          </Heading>
          <Spacer />
        </HStack>

        <HStack w="100%">
          <RegionSelect generation={generation} handleChange={setGeneration} />
        </HStack>
        {(userPokedexProgressIsLoading || isLoading) && (
          <Center w="100%" h="40%">
            <CircularProgress color="green.300" isIndeterminate />
          </Center>
        )}
        {pokedexProgress && (
          <VStack>
            <HStack align="center" h="30%">
              <Box h="100%">
                <PokedexCircle
                  label={"通常"}
                  myCount={pokedexProgress.normal.myCount}
                  allCount={pokedexProgress.normal.allCount}
                />
              </Box>
              <Box h="100%">
                <PokedexCircle
                  label={"3つ星"}
                  myCount={pokedexProgress.star3.myCount}
                  allCount={pokedexProgress.star3.allCount}
                />
              </Box>
            </HStack>
            <HStack h="30%">
              <PokedexCircle
                label={"色違い"}
                myCount={pokedexProgress.shiny.myCount}
                allCount={pokedexProgress.shiny.allCount}
              />
              <PokedexCircle
                label={"色違い3つ星"}
                myCount={pokedexProgress.shinyStar3.myCount}
                allCount={pokedexProgress.shinyStar3.allCount}
              />
              <PokedexCircle
                label={"評価MAX"}
                myCount={pokedexProgress.max.myCount}
                allCount={pokedexProgress.max.allCount}
              />
            </HStack>
            <HStack h="30%">
              <PokedexCircle
                label={"シャドウ"}
                myCount={pokedexProgress.shadow.myCount}
                allCount={pokedexProgress.shadow.allCount}
              />
              <PokedexCircle
                label={"ライト"}
                myCount={pokedexProgress.purify.myCount}
                allCount={pokedexProgress.purify.allCount}
              />
              <PokedexCircle
                label={"キラ"}
                myCount={pokedexProgress.lucky.myCount}
                allCount={pokedexProgress.lucky.allCount}
              />
            </HStack>
          </VStack>
        )}
      </VStack>
    </>
  );
};
