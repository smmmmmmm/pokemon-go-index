import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { logout } from "@/infra/firebase";

export const useLogout = () => {
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updateRocketMember"],
    mutationFn: logout,
    onSuccess: () => {
      CreateSuccessToast(toast, `ログアウトしました`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      CreateFailureToast(
        toast,
        `ログアウトに失敗しました: ${err.errorMessage}`
      );
    },
  });

  return mutate;
};
