import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";

import {
  EventFromFirestore,
  EventGroupFromFirestore,
  PogoEvent,
  PogoEventAdd,
  PogoEventGroup,
  PogoEventGroupAdd,
  PogoEventGroupUpdate,
  PogoEventUpdate,
} from "@/features/events";
import { db } from "@/infra/firebase";

/*
  document ref
*/

const eventCollection = () => {
  return collection(db, "events");
};

const eventDocument = (eventId: string) => {
  return doc(db, "events", eventId);
};

const eventGroupCollection = (eventId: string) => {
  return collection(db, "events", eventId, "eventGroups");
};
const eventGroupDocument = (eventId: string, eventGroupId: string) => {
  return doc(db, "events", eventId, "eventGroups", eventGroupId);
};

/*
  persistance
*/

// Events
export const createEvent = async (pAdd: PogoEventAdd): Promise<void> => {
  await addDoc(eventCollection(), pAdd);
};

export const fetchAllEvents = async (): Promise<PogoEvent[]> => {
  const eventsQuery = await getDocs(eventCollection());
  return await Promise.all(
    eventsQuery.docs.map(async (eventDoc) => EventFromFirestore(eventDoc))
  );
  // const eventGroupQuery = await getDocs(eventGroupCollection(eventDoc.id));
  // const eventGroups = eventGroupQuery.docs.map((eventGroupDoc) =>
  //   EventGroupFromFirestore(eventGroupDoc)
  // );
  // pogoEvent["eventGroups"] = eventGroups;
};

export const updateEvent = async (
  pogoEventId: string,
  eUpd: PogoEventUpdate
): Promise<void> => {
  await setDoc(eventDocument(pogoEventId), eUpd);
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await deleteDoc(eventDocument(eventId));
};

// Event Groups

export const createEventGroup = async (
  e: PogoEvent,
  egAdd: PogoEventGroupAdd
): Promise<void> => {
  await addDoc(eventGroupCollection(e.eventId), egAdd);
};

export const fetchAllEventGroups = async (
  eventId: string
): Promise<PogoEventGroup[]> => {
  const eventGroupsQuery = await getDocs(eventGroupCollection(eventId));
  return await Promise.all(
    eventGroupsQuery.docs.map(async (doc) => EventGroupFromFirestore(doc))
  );
};

export const updateEventGroup = async (
  e: PogoEvent,
  eg: PogoEventGroup,
  newEG: PogoEventGroupUpdate
): Promise<void> => {
  await setDoc(eventGroupDocument(e.eventId, eg.eventGroupId), newEG);
};

export const deleteEventGroup = async (
  e: PogoEvent,
  eg: PogoEventGroup
): Promise<void> => {
  await deleteDoc(eventGroupDocument(e.eventId, eg.eventGroupId));
};
