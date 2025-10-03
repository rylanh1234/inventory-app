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

module.exports = {
    getAllPokemons,
    getAllTrainers,
    getAllTypes,
    getPokemonByID,
    getTrainerByID,
    getTypeByID
};