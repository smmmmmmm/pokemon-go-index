import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { PokedexType } from "@/features/userPokedex";
import { queryPokemonIds } from "@/infra/users";

export const usePokemonIdsQuery = (
  pokedexType: PokedexType,
  pokedexTypeCondition: boolean,
  userId?: string
) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["usePokemonIdsQuery", userId, pokedexType, pokedexTypeCondition],
    queryFn: () => {
      if (userId) {
        return queryPokemonIds(userId, pokedexType, pokedexTypeCondition);
      }
    },
    staleTime: 0,
    cacheTime: Infinity,
    enabled: !!userId,
  });
  return {
    queryPokemonIds: data,
    useQueryPokemonIdsLoading: isLoading,
    isError: isError,
    error: error,
  };
};
