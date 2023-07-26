import { useMemo } from "react";

import {
  DisplayPokemon,
  FilteringOption,
  Pokemon,
  PokemonId,
  useAllPokemonsGet,
} from "@/features/pokemons";

const addEvolvePokemons = (
  allPokemons: Map<PokemonId, Pokemon>,
  filteredPokemons: DisplayPokemon[]
): DisplayPokemon[] => {
  const extendedPokemons: DisplayPokemon[] = [];

  // 進化先のポケモンを dfs で再帰的にリストアップして `extendedPokemons` に追加する
  const dfs = (pokemon: Pokemon, isExtra: boolean, nextPokemon?: Pokemon) => {
    extendedPokemons.push({
      pokemon: pokemon,
      isExtra: isExtra,
    });

    // 進化ポケモンのリストアップ
    pokemon.nextEvolveApiIds.forEach((nextEvolveId: PokemonId) => {
      const evolvedPokemon = allPokemons.get(nextEvolveId);
      if (evolvedPokemon) {
        // 進化先が，次のポケモンではない場合, dfs を続ける
        if (evolvedPokemon.pokemonId != nextPokemon?.pokemonId) {
          dfs(evolvedPokemon, true, nextPokemon);
        }
      }
    });
  };

  for (let i = 0; i < filteredPokemons.length; i++) {
    if (i < filteredPokemons.length - 1) {
      dfs(filteredPokemons[i].pokemon, false, filteredPokemons[i + 1].pokemon);
    } else {
      dfs(filteredPokemons[i].pokemon, false);
    }
  }
  return extendedPokemons;
};

export const useFilteringPokemons = (
  selectPokemonIds?: PokemonId[],
  filteringOption?: FilteringOption,
  showExtra = false
) => {
  const { allPokemons } = useAllPokemonsGet();

  return useMemo(() => {
    if (!allPokemons) {
      return [];
    }

    // Filter by pokemonIds
    let filteredPokemons: DisplayPokemon[] = [];
    if (selectPokemonIds) {
      selectPokemonIds.forEach((pokemonId) => {
        const pokemon = allPokemons.get(pokemonId);
        if (pokemon) {
          filteredPokemons.push({ pokemon: pokemon, isExtra: false });
        }
      });
    } else {
      allPokemons.forEach((pokemon: Pokemon) => {
        if (pokemon) {
          filteredPokemons.push({ pokemon: pokemon, isExtra: false });
        }
      });
    }

    // Filter by filteringOption
    if (filteringOption) {
      filteredPokemons = filteredPokemons.filter((v) =>
        v.pokemon.isFilter(filteringOption)
      );
    }

    // Add extra
    if (showExtra) {
      filteredPokemons = addEvolvePokemons(allPokemons, filteredPokemons);
    }

    return filteredPokemons;
  }, [allPokemons, filteringOption, showExtra, selectPokemonIds]);
};
