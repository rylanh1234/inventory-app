const { Router } = require("express");
const { getPokemonData } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get("/", getPokemonData);

module.exports = indexRouter;