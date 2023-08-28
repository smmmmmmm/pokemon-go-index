import { useRouter } from "next/router";

import React, { FC } from "react";

import {
  Box,
  Divider,
  HStack,
  Image,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineManageSearch } from "react-icons/md";

import { useLogout, useUser } from "@/features/users";

const SimpleMenuButton: FC<{
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
  disabled: boolean;
}> = (props) => {
  return (
    <Box
      as={props.isSelected ? undefined : "button"}
      pt={2}
      pr={1}
      pb={2}
      pl={1}
      border={0}
      bgColor={props.isSelected ? "blue.300" : undefined}
      disabled={props.disabled}
      onClick={props.isSelected ? () => undefined : props.onClick}
    >
      {props.children}
    </Box>
  );
};

export const MenuBar: FC = (props) => {
  const router = useRouter();
  const { user } = useUser();
  const logout = useLogout();

  return (
    <HStack as="nav" zIndex={999} w="100%" h="40px" p={2} bgColor="blue.200">
      <SimpleMenuButton
        onClick={() => router.push(`/`)}
        isSelected={false}
        disabled={false}
      >
        <Text pr="10px" color="blue.600" fontSize="md" fontWeight="bold">
          PGI
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/my-pokedex`)}
        isSelected={router.asPath.startsWith(`/my-pokedex`)}
        disabled={!user}
      >
        <Text color="white" fontSize="sm">
          図鑑
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/events`)}
        isSelected={router.asPath.startsWith(`/events`)}
        disabled={!user}
      >
        <Text color="white" fontSize="sm">
          イベント
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/field-research`)}
        isSelected={router.asPath.startsWith(`/field-research`)}
        disabled={!user}
      >
        <Image boxSize="23px" alt="research" src="/menu_icons/research.png" />
      </SimpleMenuButton>
      {/* <SimpleMenuButton
        onClick={() => router.push(`/raid`)}
        isSelected={router.asPath.startsWith(`/raid`)}
        disabled={!user}
      >
        <Image boxSize="23px" src="/menu_icons/raid.png" alt="raid" />
      </SimpleMenuButton> */}
      <SimpleMenuButton
        onClick={() => router.push(`/rocket`)}
        isSelected={router.asPath.startsWith(`/rocket`)}
        disabled={!user}
      >
        <Image boxSize="23px" alt="rocket" src="/menu_icons/rocket.png" />
      </SimpleMenuButton>

      <SimpleMenuButton
        onClick={() => router.push(`/query`)}
        isSelected={router.asPath.startsWith(`/query`)}
        disabled={!user}
      >
        <MdOutlineManageSearch size="23" />
      </SimpleMenuButton>
      <Spacer />

      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Box alignContent={"center"} h="100%">
            <BiUserCircle size={"23px"} />
          </Box>
        </PopoverTrigger>
        <PopoverContent zIndex={9999} w="auto">
          <PopoverBody zIndex={9999} whiteSpace="nowrap" userSelect="none">
            <VStack zIndex={9999} align="start">
              <Text fontWeight={700}> {user?.email} </Text>
              <Divider />
              <Link
                onClick={() => {
                  if (user) {
                    router.push(`/user/pokedex-progress`);
                  }
                }}
              >
                progress
              </Link>
              <Link onClick={() => logout()}>Logout</Link>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};
