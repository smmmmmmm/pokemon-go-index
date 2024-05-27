import { useQuery } from "@tanstack/react-query";

import { Pokemon } from "@/features/pokemons";
import { UserPokedex } from "@/features/userPokedex";
import { fetchUserPokedex } from "@/infra/users";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const usePokedexPageGet = (
  userId: string,
  pokemon: Pokemon,
  formName: string | null
) => {
  const { isLoading, isError, data, error } = useQuery<UserPokedex>({
    queryKey: ["usePokedexPageGet", userId, pokemon.pokemonId, formName],
    queryFn: async () => {
      const userPokedex = await fetchUserPokedex(userId, pokemon, formName);
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
