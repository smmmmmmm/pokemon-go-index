import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateSuccessToast } from "@/components/uiParts/Toast";
import { updatePokemon } from "@/infra/pokemon";

export const useUpdatePokemons = (
  pokemonId: string,
  type: "shadow" | "shiny"
) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updatePokemon"],
    mutationFn: async (newExist: boolean) => {
      // queryClient.cancelQueries(["updatePokemon"]);
      return updatePokemon(pokemonId, type, newExist);
    },
    onSuccess: () => {
      const queryKeys = ["fetchAllEvents"];
      // queryClient.setQueryData(
      //   queryKeys,
      //   (old: PogoEvent[] | undefined) => {

      //     old && old.filter((v) => v.preOrderId !== preOrderId)
      //   }
      // );
      queryClient.invalidateQueries(queryKeys);
      CreateSuccessToast(toast, "図鑑を更新しました");
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    updatePokemonsMutate: mutate,
  };
};
