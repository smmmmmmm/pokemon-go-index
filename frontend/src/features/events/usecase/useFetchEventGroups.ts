import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { fetchAllEventGroups } from "@/infra/event";

export const useFetchEventGroups = (eventId?: string) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["useFetchEventGroups", eventId],
    queryFn: () => {
      if (eventId) {
        return fetchAllEventGroups(eventId);
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!eventId,
  });

  if (isError) {
    console.log(error);
  }
  return {
    eventGroups: data,
    eventGroupsIsLoading: isLoading,
  };
};
