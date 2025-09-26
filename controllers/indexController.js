const db = require("../db/queries");

async function getPokemons(req, res) {
    const pokemons = await db.getAllPokemons();
    if (!pokemons) {
        res.status(404).send("Pokemon not found");
        return;
    }

    res.send("Pokemon Names: " + pokemons.map(pokemon => pokemon.name).join(", "));
};

module.exports = { getPokemons };