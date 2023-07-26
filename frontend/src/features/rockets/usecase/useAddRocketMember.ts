import { useMutation, useQueryClient } from "@tanstack/react-query";

import { RocketMemberAdd } from "@/features/rockets/model/rocketMember";
import { createRocketMember } from "@/infra/rockets";

export const useAddRocketMember = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addRocketMember"],
    mutationFn: async (r: RocketMemberAdd) => {
      createRocketMember(r);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllRockets"]);
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    mutateAddRocketMember: mutate,
  };
};
