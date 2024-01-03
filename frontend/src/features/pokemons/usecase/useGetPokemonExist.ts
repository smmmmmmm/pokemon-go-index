import { useQuery } from "@tanstack/react-query";

import { fetchPokemonExist } from "@/infra/pokemon";

export const useGetPokemonExist = (pokemonId: string) => {
  const { data, isError, error } = useQuery({
    queryKey: ["useGetPokemonExist", pokemonId],
    queryFn: async () => {
      return fetchPokemonExist(pokemonId);
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    pokemonExist: data,
  };
};
