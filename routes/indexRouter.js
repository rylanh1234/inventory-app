const { Router } = require("express");
const { getPokemons } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get("/", getPokemons);

module.exports = indexRouter;