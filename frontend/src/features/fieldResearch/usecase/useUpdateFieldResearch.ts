import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import {
  FieldResearch,
  FieldResearchGroup,
  FieldResearchUpdate,
} from "@/features/fieldResearch";
import { updateFieldResearch } from "@/infra/fieldResearch";

export const useUpdateFieldResearch = (
  frg: FieldResearchGroup,
  fr: FieldResearch
) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: [
      "updateFieldResearch",
      frg.fieldResearchGroupId,
      fr.fieldResearchId,
    ],
    mutationFn: async (frUpd: FieldResearchUpdate) => {
      queryClient.cancelQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      await updateFieldResearch(frg, fr, frUpd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "fetchFieldResearches",
        frg.fieldResearchGroupId,
      ]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチ: "${fr.title}" を更新しました`
      );
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `フィールドリサーチ: "${fr.title}" の更新に失敗しました`
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
