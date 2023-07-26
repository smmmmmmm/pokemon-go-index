import { useMutation } from "@tanstack/react-query";

import { PokedexType, UserPokedex } from "@/features/userPokedex";
import { updateUserPokedex } from "@/infra/users";
import { queryClient } from "@/Query";

export const usePokedexPageUpdate = (userId: string, pokemonId: string) => {
  const getQueryKey = ["usePokedexPageGet", userId, pokemonId];

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
        await updateUserPokedex(userId, pokemonId, pokedexType, newVal);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: getQueryKey });
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
