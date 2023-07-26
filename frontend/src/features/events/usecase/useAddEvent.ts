import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { PogoEventAdd } from "@/features/events";
import { createEvent } from "@/infra/event";

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addEvent"],
    mutationFn: async (pAdd: PogoEventAdd) => {
      await createEvent(pAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["useFetchEvents"]);
      CreateSuccessToast(
        toast,
        `イベント: "${variables.eventName}" を追加しました`
      );
    },
    onError: (_, variables) => {
      CreateFailureToast(
        toast,
        `イベント: "${variables.eventName}" の追加に失敗しました`
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
