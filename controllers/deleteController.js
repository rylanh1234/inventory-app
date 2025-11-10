const db = require("../db/queries");

async function deleteItemPost(req, res) {
    const { item, id } = req.params;
    await db.deleteItem(item, id);
    res.redirect("/");
}

module.exports = { deleteItemPost };