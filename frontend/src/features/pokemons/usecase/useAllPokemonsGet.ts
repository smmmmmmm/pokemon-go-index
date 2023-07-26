import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Pokemon, PokemonId } from "@/features/pokemons";
import { fetchAllPokemons } from "@/infra/pokemon";

export const useAllPokemonsGet = (enable = true) => {
  const { data, isLoading, isError, error } = useQuery<Map<PokemonId, Pokemon>>(
    {
      queryKey: ["useAllPokemonGet"],
      queryFn: async () => {
        let pokemons = await fetchAllPokemons();
        pokemons = pokemons.sort((a, b) => a.dexNo - b.dexNo);
        return new Map<PokemonId, Pokemon>(
          pokemons.map((pokemon) => [pokemon.pokemonId, pokemon])
        );
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: enable,
    }
  );

  if (isError) {
    console.error(error);
  }

  return {
    allPokemons: data,
    isLoading: isLoading,
  };
};
