const db = require("../db/queries");

async function getPokemons(req, res) {
    const pokemons = await db.getAllPokemons();
    if (!pokemons) {
        res.status(404).send("Pokemon not found");
        return;
    }

    res.render("index", {pokemons: pokemons});
};

module.exports = { getPokemons };