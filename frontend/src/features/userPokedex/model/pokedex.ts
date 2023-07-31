import { DocumentData } from "firebase/firestore/lite";

import { Pokemon } from "@/features/pokemons";

export type IsHaving = {
  normal: boolean; // 通常
  shiny: boolean; // 色違い
  shinyStar3: boolean; // 色違い星3
  star3: boolean; // 星3
  max: boolean; // 評価MAX
  shadow: boolean; // シャドウポケモン
  purify: boolean; // ライトポケモン
  lucky: boolean; // キラポケモン
};

export type PokedexType = keyof IsHaving;
export const PokedexTypeChoices: PokedexType[] = [
  "normal",
  "star3",
  "shiny",
  "shinyStar3",
  "max",
  "shadow",
  "purify",
  "lucky",
];
export const GetPokedexTypeLabel = (pokedexType: PokedexType) => {
  switch (pokedexType) {
    case "normal":
      return "通常";
    case "star3":
      return "星3";
    case "shiny":
      return "色違い";
    case "shinyStar3":
      return "星3色違い";
    case "max":
      return "評価MAX";
    case "shadow":
      return "シャドウ";
    case "purify":
      return "ライト";
    case "lucky":
      return "キラ";
  }
};

export type UserPokedex = {
  dexNo: number;
  generation: number;
  isHaving: IsHaving;
};

export const defaultUserPokedex = (pokemon: Pokemon): UserPokedex => {
  return {
    dexNo: pokemon.dexNo,
    generation: pokemon.generation,
    isHaving: {
      normal: false,
      shiny: false,
      shinyStar3: false,
      star3: false,
      max: false,
      shadow: false,
      purify: false,
      lucky: false,
    },
  };
};

export const newUserPokedex = (
  data: DocumentData,
  pokemon: Pokemon
): UserPokedex => {
  return {
    dexNo: pokemon.dexNo,
    generation: pokemon.generation,
    isHaving: {
      normal: data.isHaving.normal ?? false,
      shiny: data.isHaving.shiny ?? false,
      shinyStar3: data.isHaving.shinyStar3 ?? false,
      star3: data.isHaving.star3 ?? false,
      max: data.isHaving.max ?? false,
      shadow: data.isHaving.shadow ?? false,
      purify: data.isHaving.purify ?? false,
      lucky: data.isHaving.lucky ?? false,
    },
  };
};
