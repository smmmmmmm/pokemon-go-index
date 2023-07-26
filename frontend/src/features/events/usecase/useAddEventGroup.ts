import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { PogoEvent, PogoEventGroupAdd } from "@/features/events";
import { createEventGroup } from "@/infra/event";

export const useAddEventGroup = (e: PogoEvent) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updateEventGroup", e.eventId],
    mutationFn: async (egAdd: PogoEventGroupAdd) => {
      await createEventGroup(e, egAdd);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["useFetchEventGroups", e.eventId]);
      CreateSuccessToast(
        toast,
        `イベントグループ: "${variables.eventGroupName}" を追加しました`
      );
    },
    onError: (_, variables) => {
      CreateFailureToast(
        toast,
        `イベントグループ: "${variables.eventGroupName}" の追加に失敗しました`
      );
    },
  });

  return {
    mutate: mutate,
    isError: isError,
    error: error,
  };
};
