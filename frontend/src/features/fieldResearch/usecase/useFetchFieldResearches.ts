import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { FieldResearchGroup } from "@/features/fieldResearch";
import { fetchFieldResearches } from "@/infra/fieldResearch";

export const useFetchFieldResearches = (frg?: FieldResearchGroup) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetchFieldResearches", frg?.fieldResearchGroupId],
    queryFn: () => {
      if (frg) {
        return fetchFieldResearches(frg.fieldResearchGroupId);
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!frg,
  });

  if (isError) {
    console.log(error);
  }
  return {
    fieldResearches: data,
    fieldResearchesIsLoading: isLoading,
  };
};
