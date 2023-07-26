import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { PogoEvent } from "@/features/events";
import { fetchAllEvents } from "@/infra/event";

export const useFetchEvents = () => {
  const { isLoading, isError, data, error } = useQuery<PogoEvent[]>({
    queryKey: ["useFetchEvents"],
    queryFn: fetchAllEvents,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isError) {
    console.log(error);
  }
  return {
    events: data,
    eventsIsLoading: isLoading,
  };
};
