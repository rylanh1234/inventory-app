const db = require("../db/queries");

async function createItemGet(req, res) {
    const { item } = req.params;
    res.render("form", { item: item });
}

async function createItemPost(req, res) {
    const item = req.body;
    await db.insertItem(item);
    res.redirect("/");
}

module.exports = { createItemGet, createItemPost };