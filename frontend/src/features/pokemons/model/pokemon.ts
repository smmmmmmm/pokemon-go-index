import { FilteringOption } from "@/features/pokemons";
import { PokedexType } from "@/features/userPokedex";

export type PokemonId = string;

interface Status {
  stamina: number;
  attack: number;
  defense: number;
}

export interface PokemonInterface {
  pokemonId: PokemonId; // 內部 ID

  // meta
  form: string; // フォルム
  dexNo: number; // 図鑑番号
  generation: number; // 世代
  name: string; // 名称
  status: Status; // 種族値
  primaryType: string; // 第一タイプ
  secondaryType?: string; // 第二タイプ
  pokemonClass?: string;

  // 進化
  prevEvolveApiIds: PokemonId[];
  nextEvolveApiIds: PokemonId[];

  // 実装
  exist: boolean;
  existShiny: boolean;
  existShadow: boolean;
}
export class Pokemon {
  public pokemonId: PokemonId;

  // meta
  public form: string; // フォルム
  public dexNo: number; // 図鑑番号
  public generation: number; // 世代
  public name: string; // 名称
  public status: Status; // 種族値
  public primaryType: string; // 第一タイプ
  public secondaryType?: string; // 第二タイプ
  public pokemonClass?: string;

  // images
  // public imageUrl?: string;
  // public shinyImageUrl?: string;
  // public imagePath?: string;
  // public shinyImagePath?: string;

  // 進化
  public prevEvolveApiIds: PokemonId[];
  public nextEvolveApiIds: PokemonId[];

  // 実装
  public exist: boolean;
  public existShiny: boolean;
  public existShadow: boolean;

  constructor(data: PokemonInterface) {
    this.pokemonId = data.pokemonId;
    this.form = data.form;
    this.dexNo = data.dexNo;
    this.generation = data.generation;
    this.name = data.name;
    this.status = data.status;
    this.primaryType = data.primaryType;
    this.secondaryType = data.secondaryType;
    this.pokemonClass = data.pokemonClass;
    this.prevEvolveApiIds = data.prevEvolveApiIds;
    this.nextEvolveApiIds = data.nextEvolveApiIds;
    this.exist = data.exist;
    this.existShiny = data.existShiny;
    this.existShadow = data.existShadow;
  }

  isFilter(filteringOption: FilteringOption): boolean {
    // 名称検索 && ヒットする場合, 常に返す
    if (filteringOption.searchNameKata) {
      if (this.name.startsWith(filteringOption.searchNameKata)) {
        return true;
      } else {
        return false;
      }
    }

    // 世代
    if (
      filteringOption.generation !== undefined &&
      filteringOption.generation !== this.generation
    ) {
      return false;
    }

    // 実装状況
    if (
      filteringOption.existShiny !== undefined &&
      filteringOption.existShiny != this.existShiny
    ) {
      return false;
    }

    if (
      filteringOption.existShadow !== undefined &&
      filteringOption.existShadow != this.existShadow
    ) {
      return false;
    }

    return true;
  }

  getImage() {
    return `/images/pokemons/normal/${this.pokemonId}.png`;
  }

  getShinyImage() {
    return `/images/pokemons/shiny/${this.pokemonId}.png`;
  }

  isImplemented(pokedexType: PokedexType): boolean {
    if (pokedexType == "purify" || pokedexType == "shadow") {
      if (!this.existShadow) {
        // シャドウが存在しない
        return false;
      }
    }
    if (pokedexType == "shiny" || pokedexType == "shinyStar3") {
      if (!this.existShiny) {
        // 色違いが存在しない
        return false;
      }
    }
    return true;
  }
}

export interface DisplayPokemon {
  pokemon: Pokemon;
  isExtra: boolean;
  uniqueKey: string;
}
