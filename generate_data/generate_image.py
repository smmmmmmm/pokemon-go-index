from __future__ import annotations

from src.pogo_api import fetch_api_pokemons
import requests
import io
import os
from tqdm import tqdm
from PIL import Image

# Save png image
def expand2square(pil_img, background_color):
    width, height = pil_img.size
    if width == height:
        return pil_img
    elif width > height:
        result = Image.new(pil_img.mode, (width, width), background_color)
        result.paste(pil_img, (0, (width - height) // 2))
        return result
    else:
        result = Image.new(pil_img.mode, (height, height), background_color)
        result.paste(pil_img, ((height - width) // 2, 0))
        return result

POKEMON_IMAGES_DIR = os.path.join("..", "frontend", "public", "images", "pokemons")

def main():
    api_pokemons_dict = fetch_api_pokemons()

    os.makedirs(os.path.join(POKEMON_IMAGES_DIR, "normal"), exist_ok=True)
    os.makedirs(os.path.join(POKEMON_IMAGES_DIR, "shiny"), exist_ok=True)

    for pokemon_id, api_pokemon in tqdm(api_pokemons_dict.items()):
        if (api_pokemon.assets is not None):
            # 通常画像
            path = os.path.join(POKEMON_IMAGES_DIR, "normal", f"{pokemon_id}.png")
            if not os.path.exists(path):
                resp = requests.get(api_pokemon.assets.image)
                if resp.status_code == 200:
                    img = Image.open(io.BytesIO(requests.get(api_pokemon.assets.image).content))
                    img = expand2square(img, (255,255,255, 0))
                    img.resize((100, 100))
                    img.save(path)

            # 色違い画像
            path = os.path.join(POKEMON_IMAGES_DIR, "shiny", f"{pokemon_id}.png")
            if not os.path.exists(path):
                resp = requests.get(api_pokemon.assets.shiny_image)
                if resp.status_code == 200:
                    img = Image.open(io.BytesIO(resp.content))
                    img = expand2square(img, (255,255,255, 0))
                    img.resize((100, 100))
                    img.save(path)

if __name__ == "__main__":
    main()
