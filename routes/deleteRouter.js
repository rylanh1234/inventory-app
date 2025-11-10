const { Router } = require("express");
const { deleteItemPost } = require("../controllers/deleteController");

const deleteRouter = Router();

deleteRouter.post("/:item/:id", deleteItemPost);

module.exports = deleteRouter;
