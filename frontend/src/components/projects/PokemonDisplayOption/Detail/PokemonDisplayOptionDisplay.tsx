import { Dispatch, FC, SetStateAction } from "react";

import { CheckIcon, MinusIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { ToggleIconButtonWithText } from "@/components/uiParts/ToggleButton";
import { PokemonFilteringOption } from "@/features/pokemons";

const PokemonFilterModalBody: FC<{
  pokemonFilterOption: PokemonFilteringOption;
  setPokemonFilterOption: Dispatch<SetStateAction<PokemonFilteringOption>>;
}> = (props) => {
  const { pokemonFilterOption, setPokemonFilterOption } = props;

  return (
    <VStack align="start" w="100%">
      <Heading as="h3" py={3} fontWeight={600} size="md">
        絞り込み
      </Heading>
      <VStack>
        <Text>TODO: 実装予定</Text>
      </VStack>
      <Divider />
      <Heading as="h3" py={3} fontWeight={600} size="md">
        拡張表示
      </Heading>
      <VStack>
        <ToggleIconButtonWithText
          toggle={() =>
            setPokemonFilterOption((old) => ({
              ...old,
              showAfterEvolve: !old.showAfterEvolve,
            }))
          }
          isClicked={pokemonFilterOption.showAfterEvolve}
          text="進化先を表示"
          onIcon={<CheckIcon />}
          offIcon={<MinusIcon />}
          props={{ rounded: "10" }}
        />
      </VStack>
    </VStack>
  );
};

/**
 * presentational component
 */
export const PokemonDisplayOptionDetailPresenter: FC<{
  pokemonFilterOption: PokemonFilteringOption;
  setPokemonFilterOption: Dispatch<SetStateAction<PokemonFilteringOption>>;
}> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        pos="absolute"
        right="15px"
        bottom="15px"
        aria-label="Search database"
        bgColor="white"
        colorScheme="white"
        icon={<SearchIcon />}
        onClick={onOpen}
        rounded="full"
        size="lg"
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={5}>
            <PokemonFilterModalBody {...props} />
          </ModalBody>
          <ModalFooter p={3}>
            <Button mr={3} colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

/**
 * container component
 */
export const PokemonDisplayOptionDetailContainer: FC<{
  pokemonFilterOption: PokemonFilteringOption;
  setPokemonFilterOption: Dispatch<SetStateAction<PokemonFilteringOption>>;
}> = (props) => {
  return <PokemonDisplayOptionDetailPresenter {...props} />;
};

export const PokemonDisplayOptionDetail = PokemonDisplayOptionDetailContainer;
