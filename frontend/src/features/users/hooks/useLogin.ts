import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import {
  CreateFailureToast,
  CreateSuccessToast,
} from "@/components/uiParts/Toast";
import { login } from "@/infra/firebase";
import { upsertUser } from "@/infra/users";

export const useLogin = () => {
  const toast = useToast();

  const { mutate, isError, error } = useMutation({
    mutationKey: ["updateRocketMember"],
    mutationFn: login,
    onSuccess: (credential) => {
      console.log(credential.user.uid);
      upsertUser(credential.user.uid);
      CreateSuccessToast(toast, `ログインに成功しました`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      CreateFailureToast(toast, `ログインに失敗しました: ${err.errorMessage}`);
    },
  });

  return mutate;
};
