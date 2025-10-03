const { Router } = require("express");
const { getPokemonData, getPokemonByID, getTrainerByID, getTypeByID } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get("/", getPokemonData);
indexRouter.get("/pokemons/:pokemonID", getPokemonByID);
indexRouter.get("/trainers/:trainerID", getTrainerByID);
indexRouter.get("/types/:typeID", getTypeByID);

module.exports = indexRouter;