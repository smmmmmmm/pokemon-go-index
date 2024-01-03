import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";

import { Pokemon, PokemonId, PokemonInterface } from "@/features/pokemons";
import { ExsitType, PokemonExist } from "@/features/pokemons/model/pokemon";
import { db } from "@/infra/firebase";

/*
  document ref
*/

const pokemonCollection = () => {
  return collection(db, "pokemons");
};
const pokemonDocument = (pokemonId: PokemonId) => {
  return doc(db, "pokemons", pokemonId);
};

/*
  persistance
*/

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  console.log("LOADING ALL POKEMONS ...");
  const pokemonsQuery = await getDocs(
    query(pokemonCollection(), where("form", "==", "NORMAL"))
  );
  return pokemonsQuery.docs.map(
    (doc) => new Pokemon({ ...doc.data() } as PokemonInterface)
  );
};

export const fetchPokemonExist = async (
  pokemonId: string
): Promise<PokemonExist> => {
  const pokemonQuery = await getDoc(pokemonDocument(pokemonId));
  return pokemonQuery.data() as PokemonExist;
};

export const updatePokemonExist = async (
  pokemonId: string,
  existType: ExsitType,
  exist: boolean
): Promise<void> => {
  switch (existType) {
    case "exist":
      await updateDoc(pokemonDocument(pokemonId), {
        exist: exist,
      });
      break;
    case "existShiny":
      await updateDoc(pokemonDocument(pokemonId), {
        existShiny: exist,
      });
      break;
    case "existShadow":
      await updateDoc(pokemonDocument(pokemonId), {
        existShadow: exist,
      });
      break;
  }
};
