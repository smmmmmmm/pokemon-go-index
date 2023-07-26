import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FieldResearchGroup } from "@/features/fieldResearch";
import { fetchFieldResearchGroups } from "@/infra/fieldResearch";

export const useFetchFieldResearchGroups = () => {
  const { isLoading, isError, data, error } = useQuery<FieldResearchGroup[]>({
    queryKey: ["fetchFieldResearchGroups"],
    queryFn: fetchFieldResearchGroups,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isError) {
    console.log(error);
  }
  return {
    allFieldResearchGroups: data,
    allFieldResearchGroupsIsLoading: isLoading,
  };
};
