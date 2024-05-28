import { QueryDocumentSnapshot } from "firebase/firestore/lite";

import { PokemonKey } from "@/features/pokemons/model/pokemon";

export type EventId = string;
export type EventGroupId = string;

export interface PogoEvent {
  eventId: string;
  eventName: string;
  startAt: Date;
  endAt: Date;
}

export type PogoEventAdd = Omit<PogoEvent, "eventId" | "eventGroups">;
export type PogoEventUpdate = Partial<PogoEventAdd>;

export const EventFromFirestore = (doc: QueryDocumentSnapshot): PogoEvent => {
  const data = doc.data();
  return {
    eventId: doc.id,
    eventName: data.eventName,
    startAt: data.startAt.toDate(),
    endAt: data.endAt.toDate(),
  };
};

export interface PogoEventGroup {
  eventGroupId: string;
  eventGroupName: string;
  pokemonKeys: PokemonKey[];
}

export type PogoEventGroupAdd = Omit<PogoEventGroup, "eventGroupId">;
export type PogoEventGroupUpdate = Partial<PogoEventGroupAdd>;

export const EventGroupFromFirestore = (
  doc: QueryDocumentSnapshot
): PogoEventGroup => {
  const data = doc.data();

  let pokemonKeys: PokemonKey[] = [];
  if (data.pokemonIds) {
    pokemonKeys = data.pokemonIds.map((id: string) => ({
      pokemonId: id,
      formName: null,
    }));
  } else if (data.pokemonKeys) {
    pokemonKeys = data.pokemonKeys;
  }
  return {
    eventGroupId: doc.id,
    eventGroupName: data.eventGroupName,
    pokemonKeys: pokemonKeys,
  };
};
