from __future__ import annotations

from dataclasses import dataclass, field, asdict
from functools import lru_cache

import requests
from dataclass_wizard import JSONWizard


@dataclass
class ApiLangString:
    English: str
    German: str
    French: str
    Italian: str
    Japanese: str
    Korean: str
    Spanish: str


@dataclass
class ApiAssets:
    image: str
    shiny_image: str


@dataclass
class ApiType:
    type: str
    names: ApiLangString


@dataclass
class ApiStats:
    stamina: int
    attack: int
    defense: int

    def to_dict(self):
        return asdict(self)


@dataclass
class ApiEvolution:
    id: str
    form_id: str
    candies: int
    item: dict | None
    quests: list[dict] = field(default_factory=list)


@dataclass
class ApiPokemon(JSONWizard):
    id: str
    form_id: str
    dex_nr: int
    generation: int
    names: ApiLangString
    stats: ApiStats | None
    primary_type: ApiType
    secondary_type: ApiType | None
    pokemon_class: str | None
    assets: ApiAssets | None
    # asset_forms: list[dict[str, Any]] | None
    # region_forms: list[dict[str, Any]] | None
    evolutions: list[ApiEvolution]


@lru_cache(maxsize=1)
def fetch_api_pokemons() -> dict[str, ApiPokemon]:
    ret = requests.get("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
    api_pokemons_dict = {api_data["id"]: ApiPokemon.from_dict(api_data) for api_data in ret.json()}
    return api_pokemons_dict
