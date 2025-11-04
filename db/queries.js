const pool = require("./pool");

async function getAllPokemons() {
    const { rows } = await pool.query("SELECT * FROM pokemons");
    return rows;
}

async function getAllTrainers() {
    const { rows } = await pool.query("SELECT * FROM trainers");
    return rows;
}

async function getAllTypes() {
    const { rows } = await pool.query("SELECT * FROM types");
    return rows;
}

async function getPokemonByID(pokemonID) {
    const { rows } = await pool.query("SELECT * FROM pokemons WHERE pokemon_id = $1", [pokemonID]);
    // use $1 as a placeholder for first parameter and pass array to query
    // to avoid nefarious user input (route param)
    return rows;
}

async function getTrainerByID(trainerID) {
    const { rows } = await pool.query("SELECT * FROM trainers WHERE trainer_id = $1", [trainerID]);
    return rows;
}

async function getTypeByID(typeID) {
    const { rows } = await pool.query("SELECT * FROM types WHERE type_id = $1", [typeID]);
    return rows;
}

async function getTrainerPokemons(trainerID) {
    const { rows } = await pool.query("SELECT * FROM pokemons WHERE trainer_id = $1", [trainerID]);
    return rows;
}

async function getPokemonType(pokemonName) {
    const { rows } = await pool.query("SELECT t.name FROM types t JOIN pokemon_type pt ON t.type_id = pt.type_id JOIN pokemons p ON pt.pokemon_id = p.pokemon_id WHERE p.name = $1", [pokemonName]);
    return rows;
}

async function getPokemonOfType(type) {
    const { rows } = await pool.query("SELECT p.name FROM pokemons p JOIN pokemon_type pt ON p.pokemon_id = pt.type_id JOIN types t ON pt.pokemon_id = t.type_id WHERE t.name = $1", [type]);
    return rows;
}

async function insertItem(item) {
    if (item.trainerName) {
        await pool.query("INSERT INTO trainers (name) VALUES($1)", [item.trainerName]);
    }
    else if (item.pokemonName) {
        // insert the new pokemon and returns its id
        const { rows } = await pool.query("INSERT INTO pokemons (name) VALUES($1) RETURNING pokemon_id", [item.pokemonName]);
        // relate each type to the new pokemon
        for (type of item.type) {
            await pool.query("INSERT INTO pokemon_type (pokemon_id, type_id) VALUES ($1, $2)", [rows[0].pokemon_id, type]);
        }
    }
}

module.exports = {
    getAllPokemons,
    getAllTrainers,
    getAllTypes,
    getPokemonByID,
    getTrainerByID,
    getTypeByID,
    getTrainerPokemons,
    getPokemonType,
    getPokemonOfType,
    insertItem
};