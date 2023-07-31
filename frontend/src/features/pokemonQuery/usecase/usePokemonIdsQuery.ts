import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { PokedexType } from "@/features/userPokedex";
import { queryPokemonIds } from "@/infra/users";

export const usePokemonIdsQuery = (
  userId?: string,
  pokedexType?: PokedexType
) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["usePokemonIdsQuery", userId, pokedexType],
    queryFn: () => {
      if (userId && pokedexType) {
        return queryPokemonIds(userId, pokedexType);
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!userId && !!pokedexType,
  });
  return {
    queryPokemonIds: data,
    useQueryPokemonIdsLoading: isLoading,
    isError: isError,
    error: error,
  };
};
