import { useMemo } from "react";

import {
  DisplayPokemon,
  Pokemon,
  PokemonFilteringOption,
  PokemonId,
  useAllPokemonsGet,
} from "@/features/pokemons";

const addEvolvePokemons = (
  allPokemons: Map<PokemonId, Pokemon>,
  filteredPokemons: DisplayPokemon[]
): DisplayPokemon[] => {
  const extendedPokemons: DisplayPokemon[] = [];

  // 進化先のポケモンを dfs で再帰的にリストアップして `extendedPokemons` に追加する
  const dfs = (
    origin: Pokemon, // 大本の進化元のポケモン
    current: Pokemon,
    isExtra: boolean,
    next?: Pokemon
  ) => {
    extendedPokemons.push({
      pokemon: current,
      isExtra: isExtra,
      uniqueKey: isExtra
        ? `${current.pokemonId}-evolved-from-${origin.pokemonId}`
        : current.pokemonId,
    });

    // 進化ポケモンのリストアップ
    current.nextEvolveApiIds.forEach((nextEvolveId: PokemonId) => {
      const evolvedPokemon = allPokemons.get(nextEvolveId);
      if (evolvedPokemon) {
        // 進化先が次のポケモンではない場合, dfs を続ける
        if (evolvedPokemon.pokemonId != next?.pokemonId) {
          dfs(origin, evolvedPokemon, true, next);
        }
      }
    });
  };

  for (let i = 0; i < filteredPokemons.length; i++) {
    if (i < filteredPokemons.length - 1) {
      dfs(
        filteredPokemons[i].pokemon,
        filteredPokemons[i].pokemon,
        false,
        filteredPokemons[i + 1].pokemon
      );
    } else {
      dfs(filteredPokemons[i].pokemon, filteredPokemons[i].pokemon, false);
    }
  }
  return extendedPokemons;
};

export const useFilteringPokemons = (
  selectPokemonIds?: PokemonId[],
  pokemonFilteringOption?: PokemonFilteringOption
) => {
  const { allPokemons } = useAllPokemonsGet();

  return useMemo<DisplayPokemon[]>(() => {
    if (!allPokemons) {
      return [];
    }

    // Filter by pokemonIds
    let filteredPokemons: DisplayPokemon[] = [];
    if (selectPokemonIds) {
      selectPokemonIds.forEach((pokemonId) => {
        const pokemon = allPokemons.get(pokemonId);
        if (pokemon) {
          filteredPokemons.push({
            pokemon: pokemon,
            isExtra: false,
            uniqueKey: pokemon.pokemonId,
          });
        }
      });
    } else {
      allPokemons.forEach((pokemon: Pokemon) => {
        if (pokemon) {
          filteredPokemons.push({
            pokemon: pokemon,
            isExtra: false,
            uniqueKey: pokemon.pokemonId,
          });
        }
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
  }, [allPokemons, pokemonFilteringOption, selectPokemonIds]);
};
