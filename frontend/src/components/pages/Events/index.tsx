import React, { FC } from "react";

import {
  Box,
  CircularProgress,
  Divider,
  HStack,
  Heading,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";

import {
  AddEvent,
  DeleteEvent,
  UpdateEvent,
} from "@/components/pages/Events/components/EditEvent";
import {
  AddEventGroup,
  DeleteEventGroup,
  UpdateEventGroup,
} from "@/components/pages/Events/components/EditEventGroup";
import { PokedexTable } from "@/components/projects/PokedexTable/PokedexTable";
import { GroupedSelect, Select } from "@/components/uiParts/Select";
import { PogoEvent, PogoEventGroup } from "@/features/events";
import { useEvent } from "@/features/events/hooks/useEvent";

const eventLabel = (e: PogoEvent) => {
  return `${e.eventName}（${format(e.startAt, "MM/dd")} ~ ${format(
    e.endAt,
    "MM/dd"
  )})`;
};

const EventComponent: FC<{
  groupedEventOptions: {
    label: string;
    values: PogoEvent[];
  }[];
  selectEvent?: PogoEvent;
  setSelectEvent: (e: PogoEvent) => void;
}> = (props) => {
  const { groupedEventOptions, selectEvent, setSelectEvent } = props;
  return (
    <>
      <HStack w="100%">
        <Heading as="h2" size="md" p={1}>
          <Text as="u" color={"blue.500"}>
            イベント
          </Text>
        </Heading>
        <Spacer />
        {selectEvent && <UpdateEvent e={selectEvent} />}
        {selectEvent && <DeleteEvent e={selectEvent} />}
        <AddEvent />
      </HStack>
      <Box w="100%">
        <GroupedSelect<PogoEvent>
          groupedOptions={groupedEventOptions}
          value={selectEvent}
          getLabel={eventLabel}
          onChange={setSelectEvent}
        />
      </Box>
      {selectEvent && (
        <Box w="100%" pl="20px">
          <UnorderedList>
            <ListItem>
              <Text>
                期間：
                {format(selectEvent.startAt, "MM/dd H:mm")} ~{" "}
                {format(selectEvent.endAt, "MM/dd H:mm")}
              </Text>
            </ListItem>
          </UnorderedList>
        </Box>
      )}
    </>
  );
};

const EventGroupComponent: FC<{
  eventGroups: PogoEventGroup[];
  selectEvent?: PogoEvent;
  selectEventGroup?: PogoEventGroup;
  setSelectEventGroup: (eg: PogoEventGroup) => void;
}> = (props) => {
  const { eventGroups, selectEvent, selectEventGroup, setSelectEventGroup } =
    props;
  return (
    <>
      <HStack w="100%">
        <Heading as="h2" size="md" p={1}>
          <Text as="u" color={"blue.500"}>
            出現ポケモングループ
          </Text>
        </Heading>
        <Spacer />
        {selectEvent && selectEventGroup && (
          <UpdateEventGroup e={selectEvent} eg={selectEventGroup} />
        )}
        {selectEvent && selectEventGroup && (
          <DeleteEventGroup e={selectEvent} eg={selectEventGroup} />
        )}
        {selectEvent && <AddEventGroup e={selectEvent} />}
      </HStack>
      <Box w="100%">
        <Select<PogoEventGroup>
          options={eventGroups}
          value={selectEventGroup}
          getLabel={(eg) => eg.eventGroupName}
          onChange={setSelectEventGroup}
        />
      </Box>
    </>
  );
};

export const Events: FC = () => {
  const {
    // Events
    groupedEventOptions,
    eventsIsLoading,
    selectEvent,
    setSelectEvent,
    // Event Group
    eventGroups,
    eventGroupsIsLoading,
    selectEventGroup,
    setSelectEventGroup,
  } = useEvent();

  return (
    <>
      <VStack h="100%" w="100%">
        {eventsIsLoading && (
          <CircularProgress isIndeterminate color="green.300" />
        )}
        {groupedEventOptions && (
          <EventComponent
            groupedEventOptions={groupedEventOptions}
            selectEvent={selectEvent}
            setSelectEvent={setSelectEvent}
          />
        )}
        <Divider />

        {eventGroupsIsLoading && (
          <CircularProgress isIndeterminate color="green.300" />
        )}
        {eventGroups && (
          <EventGroupComponent
            eventGroups={eventGroups}
            selectEvent={selectEvent}
            selectEventGroup={selectEventGroup}
            setSelectEventGroup={setSelectEventGroup}
          />
        )}

        <VStack overflow="auto" flex={1} w="100%" align="start">
          {selectEventGroup && (
            <PokedexTable
              pokemonIds={selectEventGroup.pokemonIds}
              showExtra={true}
            />
          )}
        </VStack>
        <Box h="20px" />
      </VStack>
    </>
  );
};
