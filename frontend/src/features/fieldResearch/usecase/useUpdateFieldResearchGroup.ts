import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import {
  FieldResearchGroup,
  FieldResearchGroupUpdate,
} from "@/features/fieldResearch";
import { updateFieldResearchGroup } from "@/infra/fieldResearch";

export const useUpdateFieldResearchGroup = (frg: FieldResearchGroup) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addFieldResearch", frg.fieldResearchGroupId],
    mutationFn: async (frgUpd: FieldResearchGroupUpdate) => {
      queryClient.cancelQueries(["fetchFieldResearchGroups"]);
      await updateFieldResearchGroup(frg, frgUpd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchFieldResearchGroups"]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチグループ: "${frg.title}" を更新しました`
      );
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `フィールドリサーチグループ: "${frg.title}" の更新に失敗しました`
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
