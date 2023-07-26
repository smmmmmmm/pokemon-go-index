import React, { FC, useEffect, useState } from "react";

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

const EventGroupInputModal: FC<{
  eventGroupName: string;
  setEventGroupName: (name: string) => void;
  selectedPids: string[];
  setSelectedPids: (pids: string[]) => void;
}> = (props) => {
  const { eventGroupName, setEventGroupName, selectedPids, setSelectedPids } =
    props;
  return (
    <VStack align={"stretch"} p="10px" spacing={3}>
      <Heading as="h3" size="md" fontWeight={600}>
        詳細
      </Heading>
      <VStack>
        <HStack width={"95%"}>
          <Heading as="h4" size="sm" fontWeight={100} width={"20%"}>
            名称
          </Heading>
          <Input
            value={eventGroupName}
            onChange={(e) => setEventGroupName(e.target.value)}
          />
        </HStack>
      </VStack>
      <Divider />
      <Heading as="h3" size="md" fontWeight={600}>
        出現ポケモン
      </Heading>
      <PokemonSelectBox
        selectedPids={selectedPids}
        handleChange={(newPids: string[]) => {
          setSelectedPids(newPids);
        }}
      />
    </VStack>
  );
};

export const AddEventGroup: FC<{ e: PogoEvent }> = (props) => {
  const { e } = props;

  const [eventGroupName, setEventGroupName] = useState<string>("");
  const [selectedPids, setSelectedPids] = useState<string[]>([]);
  const { mutate } = useAddEventGroup(e);

  return (
    <EditModal
      type="create"
      submit={() => {
        mutate({
          eventGroupName: eventGroupName,
          pokemonIds: selectedPids,
        });
      }}
    >
      <EventGroupInputModal
        eventGroupName={eventGroupName}
        setEventGroupName={setEventGroupName}
        selectedPids={selectedPids}
        setSelectedPids={setSelectedPids}
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
  const [selectedPids, setSelectedPids] = useState<string[]>(
    eg.pokemonIds ?? []
  );

  useEffect(() => {
    setEventGroupName(eg.eventGroupName);
    setSelectedPids(eg.pokemonIds ?? []);
  }, [e, eg]);

  const { mutate } = useUpdateEventGroup(e, eg);

  return (
    <EditModal
      type="update"
      submit={() => {
        mutate({
          eventGroupName: eventGroupName,
          pokemonIds: selectedPids,
        });
      }}
    >
      <EventGroupInputModal
        eventGroupName={eventGroupName}
        setEventGroupName={setEventGroupName}
        selectedPids={selectedPids}
        setSelectedPids={setSelectedPids}
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
