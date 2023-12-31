from __future__ import annotations

from functools import lru_cache

import firebase_admin
import requests
from firebase_admin import firestore
from pydantic import TypeAdapter

from src.models import ApiPokemon, Pokemon, PokemonId

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app()
db = firestore.client()


@lru_cache(maxsize=1)
def fetch_api_pokemons() -> dict[PokemonId, ApiPokemon]:
    ret = requests.get("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
    ta = TypeAdapter(list[ApiPokemon])
    pp = ta.validate_python(ret.json())
    return {p.id: p for p in pp}


@lru_cache(maxsize=1)
def fetch_firestore_pokemons() -> dict[PokemonId, Pokemon]:
    data = [d.to_dict() for d in db.collection("pokemons").stream()]
    ta = TypeAdapter(list[Pokemon])
    pp = ta.validate_python(data)
    return {p.pokemon_id: p for p in pp}
