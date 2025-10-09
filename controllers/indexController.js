const db = require("../db/queries");

async function getPokemonData(req, res) {
    const pokemons = await db.getAllPokemons();
    if (!pokemons) {
        res.status(404).send("Pokemons not found");
        return;
    }

    const trainers = await db.getAllTrainers();
    if (!trainers) {
        res.status(404).send("Trainers not found");
        return;
    }

    const types = await db.getAllTypes();
    if (!types) {
        res.status(404).send("Types not found");
        return;
    }

    res.render("index", { pokemons: pokemons, trainers: trainers, types: types });
};

async function getPokemonByID(req, res) {
    const { pokemonID } = req.params;
    const pokemon = await db.getPokemonByID(Number(pokemonID));
    // expect pokemon to be an array of one row
    if (!pokemon) {
        res.status(404).send("Pokemon not found");
        return;
    }
    let pokemonTrainer = await db.getTrainerByID(pokemon[0].trainer_id);
    if (!pokemonTrainer.length) { // if pokemon has no trainer
        pokemonTrainer = [{ name: "No Trainer" }];
    }
    const pokemonTypes = await db.getPokemonType(pokemon[0].name);
    res.render("pokemon-details", { pokemon: pokemon[0], trainer: pokemonTrainer[0] , types: pokemonTypes });
};

async function getTrainerByID(req, res) {
    const { trainerID } = req.params;
    const trainer = await db.getTrainerByID(Number(trainerID));
    if (!trainer) {
        res.status(404).send("Trainer not found");
        return;
    }
    const pokemons = await db.getTrainerPokemons(Number(trainerID));
    res.render("trainer-details", { trainer: trainer[0], pokemons: pokemons });
};

async function getTypeByID(req, res) {
    const { typeID } = req.params;
    const type = await db.getTypeByID(Number(typeID));
    if (!type) {
        res.status(404).send("Type not found");
        return;
    }
    const pokemons = await db.getPokemonOfType(type[0].name);
    res.render("type-details", { type: type[0], pokemons: pokemons });
};

module.exports = { getPokemonData, getPokemonByID, getTrainerByID, getTypeByID };