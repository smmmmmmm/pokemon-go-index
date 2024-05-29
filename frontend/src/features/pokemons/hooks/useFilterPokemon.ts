import { useMemo } from "react";

import {
  DisplayPokemon,
  Pokemon,
  PokemonFilteringOption,
  PokemonId,
  useAllPokemonsGet,
} from "@/features/pokemons";
import { PokemonKey } from "@/features/pokemons/model/pokemon";

const addEvolvePokemons = (
  allPokemons: Map<PokemonId, Pokemon>,
  filteredPokemons: DisplayPokemon[]
): DisplayPokemon[] => {
  const extendedPokemons: DisplayPokemon[] = [];

  // 進化先のポケモンを dfs で再帰的にリストアップして `extendedPokemons` に追加する
  const dfs = (
    origin: Pokemon, // 大本の進化元のポケモン
    formName: string | null,
    current: Pokemon,
    isExtra: boolean,
    next?: Pokemon
  ) => {
    extendedPokemons.push({
      pokemon: current,
      formName: formName,
      isExtra: isExtra,
      uniqueKey: isExtra
        ? `${current.pokemonId}-evolved-from-${origin.pokemonId}-${formName}`
        : `${current.pokemonId}-${formName}`,
    });

    // 進化ポケモンのリストアップ
    current.nextEvolveApiIds.forEach((nextEvolveId: PokemonId) => {
      const evolvedPokemon = allPokemons.get(nextEvolveId);
      if (evolvedPokemon) {
        // 進化先が次のポケモンではない場合, dfs を続ける
        if (
          evolvedPokemon.pokemonId != next?.pokemonId &&
          evolvedPokemon.pokemonId != origin.pokemonId
        ) {
          if (formName) {
            // フォルムの進化系は、進化先に同じフォルムがある場合にのみ進化先を登録
            if (evolvedPokemon.hasForm(formName)) {
              dfs(origin, formName, evolvedPokemon, true, next);
            }
          } else {
            dfs(origin, formName, evolvedPokemon, true, next);
          }
        }
      }
    });
  };

  for (let i = 0; i < filteredPokemons.length; i++) {
    const nextPokemon =
      i < filteredPokemons.length - 1
        ? filteredPokemons[i + 1].pokemon
        : undefined;
    dfs(
      filteredPokemons[i].pokemon,
      filteredPokemons[i].formName,
      filteredPokemons[i].pokemon,
      false,
      nextPokemon
    );
  }
  return extendedPokemons;
};

export const useFilteringPokemons = (
  selectPokemonKeys?: PokemonKey[],
  pokemonFilteringOption?: PokemonFilteringOption
) => {
  const { allPokemons } = useAllPokemonsGet();

  return useMemo<DisplayPokemon[]>(() => {
    if (!allPokemons) {
      return [];
    }

    // Filter by pokemonIds
    let filteredPokemons: DisplayPokemon[] = [];
    if (selectPokemonKeys) {
      selectPokemonKeys.forEach((pkey) => {
        const pokemon = allPokemons.get(pkey.pokemonId);
        if (pokemon) {
          filteredPokemons.push({
            pokemon: pokemon,
            formName: pkey.formName,
            isExtra: false,
            uniqueKey: `${pokemon.pokemonId}-${pkey.formName}`,
          });
        }
      });
    } else {
      allPokemons.forEach((pokemon: Pokemon) => {
        filteredPokemons.push({
          pokemon: pokemon,
          formName: null,
          isExtra: false,
          uniqueKey: pokemon.pokemonId,
        });
      });
    }

    // Filter by pokemonFilteringOption
    if (pokemonFilteringOption) {
      filteredPokemons = filteredPokemons.filter((v) =>
        v.pokemon.isFilter(pokemonFilteringOption)
      );
    }

    // Add extra
    if (pokemonFilteringOption?.showAfterEvolve) {
      filteredPokemons = addEvolvePokemons(allPokemons, filteredPokemons);
    }

    return filteredPokemons;
  }, [allPokemons, pokemonFilteringOption, selectPokemonKeys]);
};
