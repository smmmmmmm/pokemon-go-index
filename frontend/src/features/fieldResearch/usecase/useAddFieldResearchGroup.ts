import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { FieldResearchGroupAdd } from "@/features/fieldResearch";
import { createFieldResearchGroup } from "@/infra/fieldResearch";

export const useAddFieldResearchGroup = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addFieldResearch"],
    mutationFn: async (frgAdd: FieldResearchGroupAdd) => {
      queryClient.cancelQueries(["fetchFieldResearchGroups"]);
      await createFieldResearchGroup(frgAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["fetchFieldResearchGroups"]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチグループ: "${variables.title}" の追加しました`
      );
    },
    onError: (_, variables) => {
      CreateFailureToast(
        toast,
        `フィールドリサーチグループ: "${variables.title}" の追加に失敗しました`
      );
    },
  });

  if (isError) {
    console.log(error);
  }

  return {
    mutate: mutate,
  };
};
