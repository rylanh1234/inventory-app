#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS pokemons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

INSERT INTO pokemons (name)
VALUES
    ('Pikachu'),
    ('Charmander');
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();