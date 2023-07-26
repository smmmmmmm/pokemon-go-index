import {
  collection,
  doc,
  getCount,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Pokemon } from "@/features/pokemons";
import {
  PokedexType,
  UserPokedex,
  defaultUserPokedex,
  newUserPokedex,
} from "@/features/userPokedex/model/pokedex";
import { db } from "@/infra/firebase";

/*
  document ref
*/

const userPokedexCollection = (userId: string) => {
  return collection(db, "users", userId, "pokedex");
};

const userPokedexDocument = (userId: string, pokemonId: string) => {
  return doc(db, "users", userId, "pokedex", pokemonId);
};

/*
  persistence
*/

export const upsertUser = async (userId: string): Promise<void> => {
  const user = await getDoc(doc(db, "users", userId));
  if (!user.exists()) {
    await setDoc(doc(db, "users", userId), {});
    console.log("Create User successful");
  }
};

export const createUserPokedex = async (
  userId: string,
  pokemon: Pokemon,
  userPokedex: UserPokedex
): Promise<void> => {
  await setDoc(userPokedexDocument(userId, pokemon.pokemonId), userPokedex);
};

// userId, pokemonId の isHaving を返す. 存在しない場合 default 値を create してから返す
export const fetchUserPokedex = async (
  userId: string,
  pokemon: Pokemon
): Promise<UserPokedex> => {
  const doc = await getDoc(userPokedexDocument(userId, pokemon.pokemonId));
  const data = doc.data();
  if (!doc.exists() || data === undefined) {
    // 存在しない場合 default 値を create してから返す
    const d = defaultUserPokedex(pokemon);
    createUserPokedex(userId, pokemon, d);
    return d;
  } else {
    return newUserPokedex(data, pokemon);
  }
};

// userId, pokemonId の isHaving の特定の key について upsert する
export const updateUserPokedex = async (
  userId: string,
  pokemonId: string,
  pokedexType: PokedexType,
  newIsHaving: boolean
) => {
  await setDoc(
    userPokedexDocument(userId, pokemonId),
    { isHaving: { [pokedexType]: newIsHaving } },
    { merge: true }
  );
};

// Count IsHaving
export const countPokedexProgress = async (
  userId: string,
  pokedexType: PokedexType,
  generation?: number
): Promise<number> => {
  const whereQueries = [where("isHaving." + pokedexType, "==", true)];
  if (generation !== undefined) {
    whereQueries.push(where("generation", "==", generation));
  }

  const q = await getCount(
    query(userPokedexCollection(userId), ...whereQueries)
  );
  return q.data().count;
};
