import React, { Dispatch, FC, useState } from "react";

import { Center, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { format, parse } from "date-fns";

import { EditModal } from "@/components/uiParts/EditModal";
import {
  PogoEvent,
  PogoEventAdd,
  useAddEvent,
  useDeleteEvent,
  useUpdateEvent,
} from "@/features/events";

const date2str = (date?: Date) => {
  if (date) {
    return format(date, "yyyy-MM-dd'T'HH:mm");
  } else {
    return undefined;
  }
};

const str2date = (s?: string) => {
  if (s) {
    return parse(s, "yyyy-MM-dd'T'HH:mm", new Date());
  } else {
    return undefined;
  }
};

const EventInputModal: FC<{
  pogoEvent: PogoEventAdd;
  setPogoEvent: Dispatch<PogoEventAdd>;
}> = (props) => {
  const { pogoEvent, setPogoEvent } = props;

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
            value={pogoEvent.eventName}
            onChange={(e) =>
              setPogoEvent({ ...pogoEvent, eventName: e.target.value })
            }
          />
        </HStack>
        <HStack width={"95%"}>
          <Heading as="h4" size="sm" fontWeight={100} width={"20%"}>
            開始日時
          </Heading>
          <Input
            placeholder="開始日時"
            value={date2str(pogoEvent.startAt)}
            type="datetime-local"
            onChange={(e) => {
              const startAt = str2date(e.target.value);
              if (startAt) {
                setPogoEvent({ ...pogoEvent, startAt: startAt });
              }
            }}
          />
        </HStack>
        <HStack width={"95%"}>
          <Heading as="h4" size="sm" fontWeight={100} width={"20%"}>
            終了日時
          </Heading>
          <Input
            placeholder="終了日時"
            value={date2str(pogoEvent.endAt)}
            type="datetime-local"
            onChange={(e) => {
              const endAt = str2date(e.target.value);
              if (endAt) {
                setPogoEvent({ ...pogoEvent, endAt: endAt });
              }
            }}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export const AddEvent: FC = () => {
  const [eventAdd, setEventAdd] = useState<PogoEventAdd>({
    eventName: "",
    startAt: new Date(),
    endAt: new Date(),
  });
  const { mutate } = useAddEvent();

  return (
    <EditModal
      type="create"
      submit={() => {
        mutate(eventAdd);
      }}
    >
      <EventInputModal pogoEvent={eventAdd} setPogoEvent={setEventAdd} />
    </EditModal>
  );
};

export const UpdateEvent: FC<{ e: PogoEvent }> = (props) => {
  const { e } = props;

  const [eventUpdate, setEventUpdate] = useState<PogoEventAdd>(e);
  const { mutate } = useUpdateEvent(e);

  return (
    <EditModal
      type="update"
      submit={() => {
        mutate(eventUpdate);
      }}
    >
      <EventInputModal pogoEvent={eventUpdate} setPogoEvent={setEventUpdate} />
    </EditModal>
  );
};

export const DeleteEvent: FC<{ e: PogoEvent }> = (props) => {
  const { e } = props;
  const { mutate } = useDeleteEvent(e);
  return (
    <EditModal type="delete" submit={mutate}>
      <Center p={5}>
        <Text fontWeight={900}> {`" ${e.eventName} "`} </Text> を削除します
      </Center>
    </EditModal>
  );
};
