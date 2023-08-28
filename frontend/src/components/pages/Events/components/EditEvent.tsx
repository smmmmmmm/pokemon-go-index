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
      <Heading as="h3" fontWeight={600} size="md">
        詳細
      </Heading>
      <VStack>
        <HStack w={"95%"}>
          <Heading as="h4" w={"20%"} fontWeight={100} size="sm">
            名称
          </Heading>
          <Input
            onChange={(e) =>
              setPogoEvent({ ...pogoEvent, eventName: e.target.value })
            }
            value={pogoEvent.eventName}
          />
        </HStack>
        <HStack w={"95%"}>
          <Heading as="h4" w={"20%"} fontWeight={100} size="sm">
            開始日時
          </Heading>
          <Input
            onChange={(e) => {
              const startAt = str2date(e.target.value);
              if (startAt) {
                setPogoEvent({ ...pogoEvent, startAt: startAt });
              }
            }}
            placeholder="開始日時"
            type="datetime-local"
            value={date2str(pogoEvent.startAt)}
          />
        </HStack>
        <HStack w={"95%"}>
          <Heading as="h4" w={"20%"} fontWeight={100} size="sm">
            終了日時
          </Heading>
          <Input
            onChange={(e) => {
              const endAt = str2date(e.target.value);
              if (endAt) {
                setPogoEvent({ ...pogoEvent, endAt: endAt });
              }
            }}
            placeholder="終了日時"
            type="datetime-local"
            value={date2str(pogoEvent.endAt)}
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
