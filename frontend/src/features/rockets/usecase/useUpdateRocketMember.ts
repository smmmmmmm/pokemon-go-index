import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  RocketMember,
  RocketMemberUpdate,
} from "@/features/rockets/model/rocketMember";
import { updateRocketMember } from "@/infra/rockets";

export const useUpdateRocketMember = (r: RocketMember) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updateRocketMember"],
    mutationFn: async (newr: RocketMemberUpdate) => {
      updateRocketMember(r, newr);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllRockets"]);
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    mutateUpdateRocketMember: mutate,
  };
};
