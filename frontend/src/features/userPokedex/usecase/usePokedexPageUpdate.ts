import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/Query";
import { PokemonId } from "@/features/pokemons";
import { PokedexType, UserPokedex } from "@/features/userPokedex";
import { updateUserPokedex } from "@/infra/users";

export const usePokedexPageUpdate = (
  userId: string,
  pokemonId: PokemonId,
  formName: string | null
) => {
  const getQueryKey = ["usePokedexPageGet", userId, pokemonId, formName];

  const { mutate, reset, data, isLoading, isSuccess, isError, error } =
    useMutation<void, Error, { pokedexType: PokedexType; newVal: boolean }>({
      mutationFn: async ({ pokedexType, newVal }): Promise<void> => {
        // cancel query
        queryClient.cancelQueries(getQueryKey);

        // Update cache
        queryClient.setQueryData<UserPokedex>(getQueryKey, (old) =>
          old
            ? {
                ...old,
                isHaving: {
                  ...old.isHaving,
                  [pokedexType]: !old.isHaving[pokedexType],
                },
              }
            : old
        );

        // Update firestore
        await updateUserPokedex(
          userId,
          pokemonId,
          formName,
          pokedexType,
          newVal
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(getQueryKey);
        queryClient.invalidateQueries(["useUserPokedexProgress", userId]);
      },
    });
  return {
    mutatePageUpdate: mutate,
    resetPageUpdate: reset,
    PageUpdate: data,
    isPageUpdateLoading: isLoading,
    isPageUpdateSuccess: isSuccess,
    isPageUpdateError: isError,
    PageUpdateError: error,
  };
};
