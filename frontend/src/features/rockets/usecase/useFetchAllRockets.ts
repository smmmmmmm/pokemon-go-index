import { useQuery } from "@tanstack/react-query";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { RocketMember } from "@/features/rockets/model/rocketMember";
import { fetchAllRockets } from "@/infra/rockets";

export const useFetchAllRockets = () => {
  const { isLoading, isError, data, error } = useQuery<RocketMember[]>({
    queryKey: ["fetchAllRockets"],
    queryFn: fetchAllRockets,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return {
    allRockets: data,
    allRocketsIsLoading: isLoading,
    allRocketsIsError: isError,
    allRocketsError: error,
  };
};
