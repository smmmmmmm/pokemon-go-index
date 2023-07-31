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
      bgColor={props.isSelected ? "blue.300" : undefined}
      pt={2}
      pb={2}
      pr={1}
      pl={1}
      border={0}
      onClick={props.isSelected ? () => undefined : props.onClick}
      disabled={props.disabled}
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
    <HStack
      as="nav"
      p={2}
      backgroundColor="blue.200"
      h="40px"
      w="100%"
      zIndex={999}
    >
      <SimpleMenuButton
        onClick={() => router.push(`/`)}
        isSelected={false}
        disabled={false}
      >
        <Text fontSize="md" color="blue.600" fontWeight="bold" pr="10px">
          PGI
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/my-pokedex`)}
        isSelected={router.asPath.startsWith(`/my-pokedex`)}
        disabled={!user}
      >
        <Text fontSize="sm" color="white">
          図鑑
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/events`)}
        isSelected={router.asPath.startsWith(`/events`)}
        disabled={!user}
      >
        <Text fontSize="sm" color="white">
          イベント
        </Text>
      </SimpleMenuButton>
      <SimpleMenuButton
        onClick={() => router.push(`/field-research`)}
        isSelected={router.asPath.startsWith(`/field-research`)}
        disabled={!user}
      >
        <Image boxSize="23px" src="/menu_icons/research.png" alt="research" />
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
        <Image boxSize="23px" src="/menu_icons/rocket.png" alt="rocket" />
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
          <Box h="100%" alignContent={"center"}>
            <BiUserCircle size={"23px"} />
          </Box>
        </PopoverTrigger>
        <PopoverContent width="auto" zIndex={9999}>
          <PopoverBody userSelect="none" whiteSpace="nowrap" zIndex={9999}>
            <VStack align="start" zIndex={9999}>
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
