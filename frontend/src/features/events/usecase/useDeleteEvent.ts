import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { PogoEvent } from "@/features/events";
import { deleteEvent } from "@/infra/event";

export const useDeleteEvent = (e: PogoEvent) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["useDeleteEvent"],
    mutationFn: async () => {
      queryClient.cancelQueries(["useDeleteEvent"]);
      await deleteEvent(e.eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["useFetchEvents"]);
      CreateSuccessToast(toast, `イベント: "${e.eventName}" を削除しました`);
    },
    onError: () => {
      CreateFailureToast(
        toast,
        `イベント: "${e.eventName}" の削除に失敗しました`
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
