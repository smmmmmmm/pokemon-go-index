export interface FilteringOption {
  searchNameKata?: string; // 名称 (カタカナ)
  generation?: number; // 世代

  // 実装
  existShiny?: boolean;
  existShadow?: boolean;

  // 拡張表示
  showAfterEvolve: boolean; // 進化先を表示
}

export const DefaultFilteringOption: FilteringOption = {
  searchNameKata: undefined,
  generation: undefined,
  existShiny: undefined,
  existShadow: undefined,
  showAfterEvolve: false,
};
