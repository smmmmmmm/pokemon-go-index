import { FC } from "react";

import {
  Box,
  CloseButton,
  CreateToastFnReturn,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";

type successToast = {
  message: string;
  onClose: () => void;
};

export const SuccessToast: FC<successToast> = (props) => {
  const { message, onClose } = props;

  return (
    <Box
      justifyContent="center"
      display="inline-flex"
      p={2}
      bg="#00EC89"
      borderRadius="4px"
    >
      <HStack spacing={3}>
        <Flex pl="10px">
          <AiOutlineCheck size="20px"></AiOutlineCheck>
        </Flex>
        <Text fontSize="lg" fontWeight="bold">
          {message}
        </Text>
        <CloseButton onClick={onClose} size="md" />
      </HStack>
    </Box>
  );
};

export const CreateSuccessToast = (
  toast: CreateToastFnReturn,
  meesage: string
) => {
  toast({
    duration: 2000,
    isClosable: true,
    render: (props) => {
      return (
        <>
          <SuccessToast message={meesage} onClose={props.onClose} />
        </>
      );
    },
  });
};

type failureToast = {
  message: string;
  onClose: () => void;
};

export const FailureToast: FC<failureToast> = (props) => {
  const { message, onClose } = props;

  return (
    <Box
      justifyContent="center"
      display="inline-flex"
      p={2}
      bg="#FF002E"
      borderRadius="4px"
    >
      <HStack spacing={3}>
        <Flex pl="10px">
          <BsExclamationCircle size="20px" color="white"></BsExclamationCircle>
        </Flex>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {message}
        </Text>
        <CloseButton onClick={onClose} size="md" />
      </HStack>
    </Box>
  );
};

export const CreateFailureToast = (
  toast: CreateToastFnReturn,
  meesage: string
) => {
  toast({
    duration: 2000,
    isClosable: true,
    render: (props) => {
      return (
        <>
          <FailureToast message={meesage} onClose={props.onClose} />
        </>
      );
    },
  });
};
