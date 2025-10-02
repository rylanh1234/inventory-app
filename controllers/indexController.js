const db = require("../db/queries");

async function getPokemonData(req, res) {
    const pokemons = await db.getAllPokemons();
    if (!pokemons) {
        res.status(404).send("Pokemon not found");
        return;
    }

    const trainers = await db.getAllTrainers();
    if (!trainers) {
        res.status(404).send("Trainer not found");
        return;
    }

    const types = await db.getAllTypes();
    if (!types) {
        res.status(404).send("Type not found");
        return;
    }

    res.render("index", {pokemons: pokemons, trainers: trainers, types: types});
};

module.exports = { getPokemonData };