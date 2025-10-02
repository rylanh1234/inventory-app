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

module.exports = {
    getAllPokemons,
    getAllTrainers,
    getAllTypes
};