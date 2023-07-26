import { QueryDocumentSnapshot } from "firebase/firestore/lite";

import { PokemonId } from "@/features/pokemons";

export interface RocketMember {
  rocketMemberId: string;
  type: string;
  getablePokemonIds: PokemonId[];
}

export type RocketMemberAdd = Omit<RocketMember, "rocketMemberId">;
export type RocketMemberUpdate = Partial<RocketMemberAdd>;

export const RocketMemberFromFirestore = (
  doc: QueryDocumentSnapshot
): RocketMember => {
  const data = doc.data();
  return {
    rocketMemberId: doc.id,
    type: data.type,
    getablePokemonIds: data.getablePokemonIds,
  };
};
