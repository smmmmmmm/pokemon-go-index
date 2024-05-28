import { FC, useEffect, useState } from "react";

import {
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PokemonSelectBox } from "@/components/projects/PokemonSelectBox";
import { EditModal } from "@/components/uiParts/EditModal";
import {
  PogoEvent,
  PogoEventGroup,
  useAddEventGroup,
  useDeleteEventGroup,
  useUpdateEventGroup,
} from "@/features/events";
import { PokemonKey } from "@/features/pokemons/model/pokemon";

const EventGroupInputModal: FC<{
  eventGroupName: string;
  setEventGroupName: (name: string) => void;
  selectedPkeys: PokemonKey[];
  setSelectedPkeys: (pkeys: PokemonKey[]) => void;
}> = (props) => {
  const { eventGroupName, setEventGroupName, selectedPkeys, setSelectedPkeys } =
    props;
  return (
    <VStack align={"stretch"} p="10px" spacing={3}>
      <Heading as="h3" fontWeight={600} size="md">
        詳細
      </Heading>
      <VStack>
        <HStack w={"95%"}>
          <Heading as="h4" w={"20%"} fontWeight={100} size="sm">
            名称
          </Heading>
          <Input
            onChange={(e) => setEventGroupName(e.target.value)}
            value={eventGroupName}
          />
        </HStack>
      </VStack>
      <Divider />
      <Heading as="h3" fontWeight={600} size="md">
        出現ポケモン
      </Heading>
      <PokemonSelectBox
        selectedPkeys={selectedPkeys}
        handleChange={setSelectedPkeys}
      />
    </VStack>
  );
};

export const AddEventGroup: FC<{ e: PogoEvent }> = (props) => {
  const { e } = props;

  const [eventGroupName, setEventGroupName] = useState<string>("");
  const [selectedPkeys, setSelectedPkeys] = useState<PokemonKey[]>([]);
  const { mutate } = useAddEventGroup(e);

  const reset = () => {
    setEventGroupName("");
    setSelectedPkeys([]);
  };

  return (
    <EditModal
      type="create"
      submit={() => {
        mutate({
          eventGroupName: eventGroupName,
          pokemonKeys: selectedPkeys,
        });
        reset();
      }}
    >
      <EventGroupInputModal
        eventGroupName={eventGroupName}
        setEventGroupName={setEventGroupName}
        selectedPkeys={selectedPkeys}
        setSelectedPkeys={setSelectedPkeys}
      />
    </EditModal>
  );
};

export const UpdateEventGroup: FC<{ e: PogoEvent; eg: PogoEventGroup }> = (
  props
) => {
  const { e, eg } = props;

  const [eventGroupName, setEventGroupName] = useState<string>(
    eg.eventGroupName
  );
  const [selectedPkeys, setSelectedPkeys] = useState<PokemonKey[]>(
    eg.pokemonKeys ?? []
  );
  const { mutate } = useUpdateEventGroup(e, eg);

  useEffect(() => {
    setEventGroupName(eg.eventGroupName);
    setSelectedPkeys(eg.pokemonKeys ?? []);
  }, [e, eg]);

  return (
    <EditModal
      type="update"
      submit={() => {
        mutate({
          eventGroupName: eventGroupName,
          pokemonKeys: selectedPkeys,
        });
      }}
    >
      <EventGroupInputModal
        eventGroupName={eventGroupName}
        setEventGroupName={setEventGroupName}
        selectedPkeys={selectedPkeys}
        setSelectedPkeys={setSelectedPkeys}
      />
    </EditModal>
  );
};

export const DeleteEventGroup: FC<{ e: PogoEvent; eg: PogoEventGroup }> = (
  props
) => {
  const { e, eg } = props;
  const { mutate } = useDeleteEventGroup(e, eg);

  return (
    <EditModal type="delete" submit={mutate}>
      <Center p={5}>
        <Text fontWeight={900}> {`" ${eg.eventGroupName} "`} </Text>{" "}
        を削除します
      </Center>
    </EditModal>
  );
};
