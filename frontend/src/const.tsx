// ポケモン DB
let dbName = "pokemons";
if (process.env.REACT_APP_DEBUG === "debug") {
  dbName = "test_pokemons";
}
export const PokemonDB: string = dbName;
export const EventsDB = "events";
export const RocketsDB = "rockets";
export const FieldResearchDB = "fieldResearchGroups";

// User DB
export const UserPokedexDB = "userPokedex";
