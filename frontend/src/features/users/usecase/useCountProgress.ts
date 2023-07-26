import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { countPokedexProgress } from "@/infra/users";

export const useUserPokedexProgress = (
  userId?: string,
  generation?: number
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["useUserPokedexProgress", userId, generation],
    queryFn: async () => {
      if (userId) {
        return {
          normal: await countPokedexProgress(userId, "normal", generation),
          star3: await countPokedexProgress(userId, "star3", generation),
          shiny: await countPokedexProgress(userId, "shiny", generation),
          shinyStar3: await countPokedexProgress(
            userId,
            "shinyStar3",
            generation
          ),
          max: await countPokedexProgress(userId, "max", generation),
          shadow: await countPokedexProgress(userId, "shadow", generation),
          purify: await countPokedexProgress(userId, "purify", generation),
          lucky: await countPokedexProgress(userId, "lucky", generation),
        };
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!userId,
  });
  return {
    userPokedexProgress: data,
    userPokedexProgressIsLoading: isLoading,
  };
};
