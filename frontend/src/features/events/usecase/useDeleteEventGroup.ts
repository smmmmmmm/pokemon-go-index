import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { PogoEvent, PogoEventGroup } from "@/features/events";
import { deleteEventGroup } from "@/infra/event";

export const useDeleteEventGroup = (e: PogoEvent, eg: PogoEventGroup) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["useDeleteEventGroup", e.eventName, eg.eventGroupName],
    mutationFn: async () => {
      queryClient.cancelQueries([
        "useDeleteEventGroup",
        e.eventName,
        eg.eventGroupName,
      ]);
      await deleteEventGroup(e, eg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["useFetchEventGroups", e.eventId]);
      CreateSuccessToast(
        toast,
        `イベントグループ: "${eg.eventGroupName}" を削除しました`
      );
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `イベントグループ: "${eg.eventGroupName}" の削除に失敗しました`
      );
    },
  });

  return {
    mutate: mutate,
    isError: isError,
    error: error,
  };
};
