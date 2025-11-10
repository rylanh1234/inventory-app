const express = require("express");
const app = express();
const newRouter = require("./routes/newRouter");
const indexRouter = require("./routes/indexRouter");
const deleteRouter = require("./routes/deleteRouter");
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));
app.use("/delete", deleteRouter);
app.use("/new", newRouter);
app.use("/", indexRouter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
});