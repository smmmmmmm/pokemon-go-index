import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExsitType, PokemonExist } from "@/features/pokemons/model/pokemon";
import { updatePokemonExist } from "@/infra/pokemon";

export const useUpdatePokemonExist = (
  pokemonId: string,
  existType: ExsitType
) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["useAllPokemonGet"],
    mutationFn: async (newExist: boolean) => {
      return updatePokemonExist(pokemonId, existType, newExist);
    },
    onSuccess: (_, newExist) => {
      const queryKeys = ["useGetPokemonExist", pokemonId];
      queryClient.setQueryData<PokemonExist>(queryKeys, (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          [existType]: newExist,
        };
      });
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    updatePokemonExistMutate: mutate,
  };
};
