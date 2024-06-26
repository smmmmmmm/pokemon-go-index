import {
  collection,
  doc,
  getCount,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";

import { Pokemon, PokemonId } from "@/features/pokemons";
import {
  PokedexType,
  UserPokedex,
  defaultUserPokedex,
  newUserPokedex,
} from "@/features/userPokedex/model/pokedex";
import { db } from "@/infra/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";

/*
  document ref
*/

const userPokedexCollection = (userId: string) => {
  return collection(db, "users", userId, "pokedex");
};

const userPokedexDocument = (
  userId: string,
  pokemonId: string,
  formName: string | null
) => {
  let id = pokemonId;
  if (formName) {
    id = id + "-" + formName;
  }
  return doc(db, "users", userId, "pokedex", id);
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
  userPokedex: UserPokedex,
  formName: string | null
): Promise<void> => {
  await setDoc(
    userPokedexDocument(userId, pokemon.pokemonId, formName),
    userPokedex
  );
};

// userId, pokemonId の isHaving を返す. 存在しない場合 default 値を create してから返す
export const fetchUserPokedex = async (
  userId: string,
  pokemon: Pokemon,
  formName: string | null
): Promise<UserPokedex> => {
  const doc = await getDoc(
    userPokedexDocument(userId, pokemon.pokemonId, formName)
  );
  const data = doc.data();
  if (!doc.exists() || data === undefined) {
    // 存在しない場合 default 値を create してから返す
    const d = defaultUserPokedex(pokemon, formName);
    createUserPokedex(userId, pokemon, d, formName);
    return d;
  } else {
    return newUserPokedex(data, pokemon, formName);
  }
};

// userId, pokemonId の isHaving の特定の key について upsert する
export const updateUserPokedex = async (
  userId: string,
  pokemonId: string,
  formName: string | null,
  pokedexType: PokedexType,
  newIsHaving: boolean
) => {
  await setDoc(
    userPokedexDocument(userId, pokemonId, formName),
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

// Query Pokemon Ids
export const queryPokemonIds = async (
  userId: string,
  pokedexType: PokedexType,
  pokedexTypeCondition: boolean
): Promise<PokemonId[]> => {
  const whereQueries = [
    where("isHaving." + pokedexType, "==", pokedexTypeCondition),
  ];
  const q = await getDocs(
    query(userPokedexCollection(userId), ...whereQueries)
  );
  return await Promise.all(
    q.docs.map(async (doc) => {
      return doc.id;
    })
  );
};
