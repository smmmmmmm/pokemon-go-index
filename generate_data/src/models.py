from __future__ import annotations

from typing import Any

from inflection import camelize
from pydantic import BaseModel, Field, HttpUrl, TypeAdapter

PokemonId = str


class MyBaseModel(BaseModel):
    class Config:
        alias_generator = lambda x: camelize(x, uppercase_first_letter=False)


class ApiLangString(MyBaseModel):
    German: str = Field(alias="German")
    French: str = Field(alias="French")
    Italian: str = Field(alias="Italian")
    Japanese: str = Field(alias="Japanese")
    Korean: str = Field(alias="Korean")
    Spanish: str = Field(alias="Spanish")
    English: str = Field(alias="English")


class ApiAssets(MyBaseModel):
    image: HttpUrl
    shiny_image: HttpUrl


class ApiType(MyBaseModel):
    type: str
    names: ApiLangString


class ApiStats(MyBaseModel):
    stamina: int
    attack: int
    defense: int


class ApiEvolution(MyBaseModel):
    id: str
    form_id: str
    candies: int
    item: dict[str, Any] | None
    quests: list[dict[str, Any]]


class ApiForm(MyBaseModel):
    form: str | None
    costume: str | None
    isFemale: bool | None
    image: HttpUrl
    shinyImage: HttpUrl


class ApiPokemon(MyBaseModel):
    id: PokemonId
    form_id: str
    dex_nr: int
    generation: int
    names: ApiLangString
    stats: ApiStats | None
    primary_type: ApiType
    secondary_type: ApiType | None
    pokemon_class: str | None
    assets: ApiAssets | None
    asset_forms: list[ApiForm] = []
    region_forms: dict[str, ApiPokemon] | list[None]
    evolutions: list[ApiEvolution]

    def get_all_evolutions(self) -> list[PokemonId]:
        """リージョンフォームも含め, 全ての可能な進化先のポケモンの id のリスト取得する
        example:
            - ウパー -> [ヌオー, ドオー]
            - ナゾノクサ -> [クサイハナ, ラフレシア, キレイハナ]
        """
        evolutions = [e.id for e in self.evolutions]
        if isinstance(self.region_forms, dict):
            for region_pokemon in self.region_forms.values():
                evolutions += [e.id for e in region_pokemon.evolutions]
        return list(dict.fromkeys(evolutions))


class Pokemon(MyBaseModel):
    pokemon_id: PokemonId
    name: str
    dex_no: int
    form: str
    generation: int

    exist: bool
    exist_shiny: bool
    exist_shadow: bool

    primary_type: str
    secondary_type: str | None
    pokemon_class: str | None
    status: ApiStats | None = None

    # 進化
    prev_evolve_api_ids: list[str]
    next_evolve_api_ids: list[str]

    @classmethod
    def from_api_pokemon(cls, api_pokemon: ApiPokemon) -> Pokemon:
        # 進化先
        data = dict(
            pokemonId=api_pokemon.id,
            name=api_pokemon.names.Japanese,
            dexNo=api_pokemon.dex_nr,
            form="NORMAL",
            generation=api_pokemon.generation,
            # //
            exist=False,
            existShiny=False,
            existShadow=False,
            # //
            primaryType=api_pokemon.primary_type.type,
            secondaryType=None
            if api_pokemon.secondary_type is None
            else api_pokemon.secondary_type.type,
            pokemonClass=api_pokemon.pokemon_class,
            status=api_pokemon.stats,
            # //
            prevEvolveApiIds=[],
            nextEvolveApiIds=api_pokemon.get_all_evolutions(),
        )
        ta = TypeAdapter(Pokemon)
        return ta.validate_python(data)

    def add_prev_evolve_ids(self, pokemon_id: str) -> None:
        if pokemon_id not in self.prev_evolve_api_ids:
            self.prev_evolve_api_ids.append(pokemon_id)

    def is_updated(self, other: Pokemon) -> bool:
        """self と other の値を比較して, API 情報に更新があるかどうかを判定する
        exist に関しては API から取れない情報なので比較しない
        """
        self_dict = self.model_dump()
        other_dict = other.model_dump()
        for d in [self_dict, other_dict]:
            for key in ["exist", "exist_shiny", "exist_shadow"]:
                d.pop(key)
        return self_dict != other_dict
