import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";

import { Pokemon, PokemonId, PokemonInterface } from "@/features/pokemons";
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

export const updatePokemon = async (
  pokemonId: string,
  type: "shadow" | "shiny",
  exist: boolean
): Promise<void> => {
  console.log("Update Pokemon");

  if (type === "shadow") {
    await updateDoc(pokemonDocument(pokemonId), {
      existShadow: exist,
    });
  }
  if (type === "shiny") {
    await updateDoc(pokemonDocument(pokemonId), {
      existShiny: exist,
    });
  }
};
