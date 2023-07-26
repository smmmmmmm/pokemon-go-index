import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Pokemon } from "@/features/pokemons";
import { UserPokedex } from "@/features/userPokedex";
import { fetchUserPokedex } from "@/infra/users";

export const usePokedexPageGet = (userId: string, pokemon: Pokemon) => {
  const { isLoading, isError, data, error } = useQuery<UserPokedex>({
    queryKey: ["usePokedexPageGet", userId, pokemon.pokemonId],
    queryFn: async () => {
      const userPokedex = await fetchUserPokedex(userId, pokemon);
      return userPokedex;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return {
    userPokedex: data,
    userPokedexIsLoading: isLoading,
    isError: isError,
    error: error,
  };
};
