require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: process.env.CONNECTION_STRING
    // "postgresql://<role_name>:<role_password>@localhost:5432/pokemon_management"
});