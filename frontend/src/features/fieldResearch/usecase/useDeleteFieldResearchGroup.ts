import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { FieldResearchGroup } from "@/features/fieldResearch";
import { deleteFieldResearchGroup } from "@/infra/fieldResearch";

export const useDeleteFieldResearchGroup = (frg: FieldResearchGroup) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["deleteFieldResearchGroup"],
    mutationFn: async () => {
      queryClient.cancelQueries(["fetchFieldResearchGroups"]);
      await deleteFieldResearchGroup(frg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchFieldResearchGroups"]);
      CreateSuccessToast(
        toast,
        `フィールドリサーチグループ: "${frg.title}" を削除しました`
      );
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `フィールドリサーチグループ: "${frg.title}" の削除に失敗しました`
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
