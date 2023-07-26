import React, { FC, ReactNode } from "react";

import {
  Box,
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useBoolean,
} from "@chakra-ui/react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { useUser } from "@/features/users";

export const EditModal: FC<{
  type: "create" | "update" | "delete";
  submit: () => void;
  children: ReactNode;
}> = (props) => {
  const { submit, type, children } = props;
  const [isOpen, setIsOepn] = useBoolean(false);
  const { isAdmin } = useUser();

  if (!isAdmin) {
    return <></>;
  }

  const handleSubmit = () => {
    setIsOepn.off();
    submit();
  };

  const icon = () => {
    switch (type) {
      case "create":
        return <BiPlus size="20px" />;
      case "update":
        return <BiEdit size="20px" />;
      case "delete":
        return <MdDelete size="20px" />;
    }
  };

  return (
    <>
      <Box as="button" onClick={setIsOepn.on} p={1}>
        {icon()}
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={setIsOepn.off}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent width="90vw">
          {children}
          <ModalFooter>
            <HStack spacing={5} align={"center"}>
              {type === "delete" ? (
                <Button colorScheme="red" onClick={handleSubmit}>
                  Delete
                </Button>
              ) : (
                <Button colorScheme="blue" onClick={handleSubmit}>
                  Save
                </Button>
              )}
              <Button colorScheme="gray" onClick={setIsOepn.off}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
