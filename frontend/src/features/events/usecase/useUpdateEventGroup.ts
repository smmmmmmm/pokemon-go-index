import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import {
  PogoEvent,
  PogoEventGroup,
  PogoEventGroupUpdate,
} from "@/features/events";
import { updateEventGroup } from "@/infra/event";

export const useUpdateEventGroup = (e: PogoEvent, eg: PogoEventGroup) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updateEventGroup", e.eventName, eg.eventGroupName],
    mutationFn: async (newEG: PogoEventGroupUpdate) => {
      await updateEventGroup(e, eg, newEG);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["useFetchEventGroups", e.eventId]);
      CreateSuccessToast(
        toast,
        `イベントグループ: "${eg.eventGroupName}" を更新しました`
      );
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `イベントグループ: "${eg.eventGroupName}" の更新に失敗しました`
      );
    },
  });

  return {
    mutate: mutate,
    isError: isError,
    error: error,
  };
};
