import { PokedexTypeChoices } from "@/features/userPokedex";

export interface PartPokedexProgress {
  myCount: number;
  allCount: number;
}

export interface PokedexProgress {
  normal: PartPokedexProgress;
  star3: PartPokedexProgress;
  shiny: PartPokedexProgress;
  shinyStar3: PartPokedexProgress;
  max: PartPokedexProgress;
  shadow: PartPokedexProgress;
  purify: PartPokedexProgress;
  lucky: PartPokedexProgress;
}

export const EncodePokedexProgress = (p: PokedexProgress): string => {
  // each p
  let q = "";
  PokedexTypeChoices.forEach((pokedexType) => {
    // each partc
    const tmp =
      p[pokedexType].myCount.toString().padStart(3, "0") +
      p[pokedexType].allCount.toString().padStart(3, "0");
    q += (+tmp).toString(35) + "z";
  });
  return q.slice(0, -1);
};

export const DecodePokedexProgress = (s: string): PokedexProgress => {
  return JSON.parse(Buffer.from(s, "base64").toString("ascii"));
};
