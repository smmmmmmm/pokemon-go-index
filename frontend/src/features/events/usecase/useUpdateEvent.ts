import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { PogoEvent, PogoEventUpdate } from "@/features/events";
import { updateEvent } from "@/infra/event";

export const useUpdateEvent = (e: PogoEvent) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["addEvent", e.eventName],
    mutationFn: async (eUpd: PogoEventUpdate) => {
      await updateEvent(e.eventId, eUpd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["useFetchEvents"]);
      CreateSuccessToast(toast, `イベント: "${e.eventName}" を更新しました`);
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `イベント: "${e.eventName}" の更新に失敗しました`
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
