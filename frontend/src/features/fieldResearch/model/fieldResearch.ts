import { QueryDocumentSnapshot } from "firebase/firestore/lite";

import { EventId } from "@/features/events";
import { PokemonId } from "@/features/pokemons";

export type FieldResearchType =
  | "歩く"
  | "GOバトルリーグ"
  | "投げる"
  | "卵"
  | "ギフト"
  | "ロケット団"
  | "捕まえる"
  | "ポケストップ"
  | "進化/強化"
  | "相棒"
  | "スナップショット"
  | "その他";

export const FieldResearchTypeChoices: FieldResearchType[] = [
  "歩く",
  "GOバトルリーグ",
  "投げる",
  "卵",
  "ギフト",
  "ロケット団",
  "捕まえる",
  "ポケストップ",
  "進化/強化",
  "相棒",
  "スナップショット",
  "その他",
];

// FieldResearch Group models

export interface FieldResearchGroup {
  fieldResearchGroupId: string;
  title: string;
  eventId?: EventId;
}

export type FieldResearchGroupAdd = Omit<
  FieldResearchGroup,
  "fieldResearchGroupId"
>;
export type FieldResearchGroupUpdate = Partial<FieldResearchGroupAdd>;

export const FieldResearchGroupFromFirestore = (
  doc: QueryDocumentSnapshot
): FieldResearchGroup => {
  const data = doc.data();
  return {
    fieldResearchGroupId: doc.id,
    title: data.title,
    eventId: data.eventId,
  };
};

// FieldResearch

export interface FieldResearch {
  fieldResearchId: string;
  title: string;
  type: FieldResearchType;
  getablePokemonIds: PokemonId[];
}

export type FieldResearchAdd = Omit<FieldResearch, "fieldResearchId">;
export type FieldResearchUpdate = Partial<FieldResearchAdd>;

export const FieldResearchFromFirestore = (
  doc: QueryDocumentSnapshot
): FieldResearch => {
  const data = doc.data();
  return {
    fieldResearchId: doc.id,
    title: data.title,
    type: data.type,
    getablePokemonIds: data.getablePokemonIds,
  };
};
