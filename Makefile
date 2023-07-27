.PHONY: update-images
update-images:
# Generate image from Pokemon GO API
	cd generate_data && poetry run python generate_image.py
# Upload image to GCS
	gsutil -m -q cp -r -n frontend/public/images/* gs://pokemon-go-index-public/images/
# Generate hash of images
	tree frontend/public/images/pokemons | md5 > frontend/public/images/hash.txt
