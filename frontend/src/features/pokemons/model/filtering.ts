export interface PokemonFilteringOption {
  searchNameKata?: string; // 名称 (カタカナ)
  generation?: number; // 世代

  // 拡張表示
  showAfterEvolve: boolean; // 進化先を表示
}

export const DefaultPokemonFilteringOption: PokemonFilteringOption = {
  showAfterEvolve: false,
};
