import React, { FC, useState } from "react";

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
import { PokemonDisplayOptionDetail } from "@/components/projects/PokemonDisplayOption";
import { GroupedSelect, Select } from "@/components/uiParts/Select";
import { PogoEvent, PogoEventGroup } from "@/features/events";
import { useEvent } from "@/features/events/hooks/useEvent";
import { FilteringOption } from "@/features/pokemons";
import { DefaultFilteringOption } from "@/features/pokemons/model/filtering";

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
        <Heading as="h2" p={1} size="md">
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
        <Heading as="h2" p={1} size="md">
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

  const [pokemonFilterOption, setPokemonFilterOption] =
    useState<FilteringOption>(DefaultFilteringOption);

  return (
    <VStack w="100%" h="100%">
      {eventsIsLoading && (
        <CircularProgress color="green.300" isIndeterminate />
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
        <CircularProgress color="green.300" isIndeterminate />
      )}
      {eventGroups && (
        <EventGroupComponent
          eventGroups={eventGroups}
          selectEvent={selectEvent}
          selectEventGroup={selectEventGroup}
          setSelectEventGroup={setSelectEventGroup}
        />
      )}

      <VStack align="start" flex={1} overflow="auto" w="100%">
        {selectEventGroup && (
          <PokedexTable
            pokemonIds={selectEventGroup.pokemonIds}
            filteringOption={pokemonFilterOption}
          />
        )}
      </VStack>

      <PokemonDisplayOptionDetail
        pokemonFilterOption={pokemonFilterOption}
        setPokemonFilterOption={setPokemonFilterOption}
      />
    </VStack>
  );
};
