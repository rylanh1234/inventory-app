const { Router } = require("express");
const { createItemGet, createItemPost } = require("../controllers/newController");

const newRouter = Router();

newRouter.get("/:item", createItemGet);

newRouter.post("/trainer", createItemPost);
newRouter.post("/pokemon", createItemPost);

module.exports = newRouter;