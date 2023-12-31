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
    item: dict | None
    quests: list[dict]


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
    asset_forms: list[ApiForm]
    region_forms: dict[str, Any] | list[None]
    evolutions: list[ApiEvolution]


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

    # images
    image_url: HttpUrl | None = None
    shiny_image_url: HttpUrl | None = None

    # 進化
    prev_evolve_api_ids: list[str]
    next_evolve_api_ids: list[str]

    @classmethod
    def from_api_pokemon(cls, api_pokemon: ApiPokemon) -> Pokemon:
        data = dict(
            pokemonId=api_pokemon.id,
            name=api_pokemon.names.Japanese,
            dexNo=api_pokemon.dex_nr,
            form=api_pokemon.form_id,
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
            imageUrl=None if api_pokemon.assets is None else api_pokemon.assets.image,
            shinyImageUrl=None if api_pokemon.assets is None else api_pokemon.assets.shiny_image,
            # //
            prevEvolveApIds=[],
            nextEvolveApIds=[e.id for e in api_pokemon.evolutions],
        )
        ta = TypeAdapter(Pokemon)
        return ta.validate_python(data)
