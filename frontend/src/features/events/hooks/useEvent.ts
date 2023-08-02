import { useEffect, useMemo, useState } from "react";

import {
  PogoEvent,
  PogoEventGroup,
  useFetchEventGroups,
  useFetchEvents,
} from "@/features/events";

const isEventDoing = (e: PogoEvent) => {
  const now = new Date();
  if (e.startAt <= now && now <= e.endAt) {
    return "開催中";
  } else if (e.startAt > now) {
    return "開催予定";
  } else {
    return "過去のイベント";
  }
};

export const useEvent = () => {
  // States
  // NOTES: 更新した時に反映を簡単にするために id を state として持っている
  const { events, eventsIsLoading } = useFetchEvents();
  const [selectEventId, setSelectEventId] = useState<string>();
  const { eventGroups, eventGroupsIsLoading } =
    useFetchEventGroups(selectEventId);
  const [selectEventGroupId, setSelectEventGroupId] = useState<string>();

  // Grouped FieldResearch Option
  const groupedEventOptions = useMemo(() => {
    if (events) {
      const sortedEvents = events.sort(
        (a, b) => a.startAt.getDate() - b.startAt.getTime()
      );
      const grouped = sortedEvents.reduce((map, e) => {
        const list = map.get(isEventDoing(e));
        if (list) {
          list.push(e);
        } else {
          map.set(isEventDoing(e), [e]);
        }
        return map;
      }, new Map<string, PogoEvent[]>());

      const groupedOptions: { label: string; values: PogoEvent[] }[] = [];
      ["開催中", "開催予定", "過去のイベント"].forEach((eventType) => {
        const groupedEvents = grouped.get(eventType);
        if (groupedEvents) {
          groupedOptions.push({
            label: eventType,
            values: groupedEvents.sort(
              (a, b) => b.startAt.getTime() - a.startAt.getDate()
            ),
          });
        }
      });
      return groupedOptions;
    }
  }, [events]);

  // Set initial state
  useEffect(() => {
    console.log(groupedEventOptions);
    if (groupedEventOptions) {
      setSelectEventId(groupedEventOptions[0]?.values[0]?.eventId);
    }
  }, [groupedEventOptions]);
  useEffect(() => {
    if (eventGroups) {
      setSelectEventGroupId(eventGroups[0]?.eventGroupId);
    }
  }, [eventGroups]);

  // ID から実態を生成する
  const selectEvent = events?.find((e) => e.eventId === selectEventId);
  const selectEventGroup = eventGroups?.find(
    (eg) => eg.eventGroupId === selectEventGroupId
  );
  const setSelectEvent = (e: PogoEvent) => {
    setSelectEventId(e.eventId);
  };
  const setSelectEventGroup = (eg: PogoEventGroup) => {
    setSelectEventGroupId(eg.eventGroupId);
  };

  return {
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
  };
};
