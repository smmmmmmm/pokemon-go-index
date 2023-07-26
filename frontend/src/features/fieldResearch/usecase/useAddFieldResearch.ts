import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { FieldResearchAdd, FieldResearchGroup } from "@/features/fieldResearch";
import { addFieldResearch } from "@/infra/fieldResearch";

export const useAddFieldResearch = (frg: FieldResearchGroup) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addFieldResearch"],
    mutationFn: async (frAdd: FieldResearchAdd) => {
      queryClient.cancelQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      await addFieldResearch(frg, frAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチ: "${variables.title}" を追加しました`
      );
    },
    onError: (_, variables) => {
      CreateFailureToast(
        toast,
        `フィールドリサーチ: "${variables.title}" の追加に失敗しました`
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
