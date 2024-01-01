from __future__ import annotations

import io
import os
import subprocess
from functools import lru_cache

import firebase_admin
import requests
from firebase_admin import firestore
from PIL import Image
from pydantic import TypeAdapter
from tqdm import tqdm

from src.models import ApiPokemon, Pokemon, PokemonId

POKEMON_IMAGES_DIR = os.path.join("..", "frontend", "public", "images", "pokemons")
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


def _preprocess_image(pil_img: Image) -> Image:
    """画像の前処理をする
    1. 縦横の長さが異なる場合、長いほうに合わせて白背景で埋めて正方形にする
    2. 100x100 にリサイズする
    """

    width, height = pil_img.size
    if width == height:
        return pil_img.resize((100, 100))
    elif width > height:
        result = Image.new(pil_img.mode, (width, width), (255, 255, 255, 0))
        result.paste(pil_img, (0, (width - height) // 2))
        return result.resize((100, 100))
    else:
        result = Image.new(pil_img.mode, (height, height), (255, 255, 255, 0))
        result.paste(pil_img, ((height - width) // 2, 0))
        return result.resize((100, 100))


def generate_images(api_pokemons: dict[PokemonId, ApiPokemon]) -> None:
    for pokemon_id, api_pokemon in tqdm(api_pokemons.items()):
        if api_pokemon.assets is not None:
            # 通常画像 を取得して `output/public/images/pokemons/normal/` に保存
            path = os.path.join(POKEMON_IMAGES_DIR, "normal", f"{pokemon_id}.png")
            if not os.path.exists(path):  # 既に存在する場合は skip
                resp = requests.get(api_pokemon.assets.image)
                if resp.status_code == 200:
                    img = Image.open(io.BytesIO(requests.get(api_pokemon.assets.image).content))
                    img = _preprocess_image(img)
                    img.save(path)

            # 色違い画像 を取得して `output/public/images/pokemons/shiny/` に保存
            path = os.path.join(POKEMON_IMAGES_DIR, "shiny", f"{pokemon_id}.png")
            if not os.path.exists(path):  # 既に存在する場合は skipに存在する場合は skip
                resp = requests.get(api_pokemon.assets.shiny_image)
                if resp.status_code == 200:
                    img = Image.open(io.BytesIO(resp.content))
                    img = _preprocess_image(img)
                    img.save(path)


def main() -> None:
    raw_api_pokemons = fetch_api_pokemons()

    # --- 画像生成 ---
    # 1. API data の URL から画像を取得, 前処理して `frontend/public/images/pokemons/` に保存
    generate_images(raw_api_pokemons)
    # 2. tree.txt を作成して更新
    ret = subprocess.run(
        ["tree", "pokemons/"],
        cwd="../frontend/public/images",
        shell=True,
        capture_output=True,
        text=True,
    )
    with open("tree.txt", "w") as f:
        f.write(ret.stdout)

    # --- API data から Pokemon クラスのインスタンスを生成 ---
    api_pokemons = {
        pokemon_id: Pokemon.from_api_pokemon(api_pokemon)
        for pokemon_id, api_pokemon in raw_api_pokemons.items()
    }
    # 進化前情報を追加
    for pokemon_id, api_pokemon in api_pokemons.items():
        for ev_id in api_pokemon.next_evolve_api_ids:
            api_pokemons[ev_id].add_prev_evolve_ids(pokemon_id)

    # firestore のデータと比較して, 作成 or 更新する必要があるデータを抽出
    current_firestore_pokemons = fetch_firestore_pokemons()
    new_firestore_pokemons = dict()
    for pokemin_id, api_pokemon in api_pokemons.items():
        current_pokemon = current_firestore_pokemons.get(pokemin_id)

        if current_pokemon is None:
            # firestore に存在しないポケモンは作成
            print(f"create {pokemin_id}")
            new_firestore_pokemons[pokemin_id] = api_pokemon
        else:
            # firestore に存在し、差分があるポケモンは更新する
            if current_pokemon.is_updated(api_pokemon):
                print(f"update {pokemin_id}")
                new_firestore_pokemons[pokemin_id] = api_pokemon
                new_firestore_pokemons[pokemin_id].exist = current_pokemon.exist
                new_firestore_pokemons[pokemin_id].exist_shadow = current_pokemon.exist_shadow
                new_firestore_pokemons[pokemin_id].exist_shiny = current_pokemon.exist_shiny

    # firestore にデータを書き込む
    for pokemon_id, pokemon in new_firestore_pokemons.items():
        db.collection("pokemons").document(pokemon_id).set(pokemon.model_dump(by_alias=True))


if __name__ == "__main__":
    main()
