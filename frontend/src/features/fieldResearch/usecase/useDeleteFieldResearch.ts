import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { FieldResearch, FieldResearchGroup } from "@/features/fieldResearch";
import { deleteFieldResearch } from "@/infra/fieldResearch";

export const useDeleteFieldResearch = (
  frg: FieldResearchGroup,
  fr: FieldResearch
) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["deleteFieldResearch"],
    mutationFn: async () => {
      queryClient.cancelQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      await deleteFieldResearch(frg, fr);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチ: "${fr.title}" を削除しました`
      );
    },
    onError: (_, variables) => {
      CreateFailureToast(
        toast,
        `フィールドリサーチ: "${fr.title}" の削除に失敗しました`
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
