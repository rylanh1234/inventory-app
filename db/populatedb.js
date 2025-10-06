#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS trainers CASCADE;
DROP TABLE IF EXISTS pokemons CASCADE;
DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS pokemon_type;

CREATE TABLE IF NOT EXISTS trainers (
    trainer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

INSERT INTO trainers (name)
VALUES
    ('Red'),
    ('Sapphire');



CREATE TABLE IF NOT EXISTS pokemons (
    pokemon_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    trainer_id INTEGER REFERENCES trainers(trainer_id) ON DELETE SET NULL
);

INSERT INTO pokemons (name, trainer_id)
VALUES
    ('Pikachu', 1),
    ('Charmander', 2);




CREATE TABLE IF NOT EXISTS types (
    type_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

INSERT INTO types (name)
VALUES
    ('Electric'),
    ('Fire'),
    ('Water');



CREATE TABLE IF NOT EXISTS pokemon_type (
    pokemon_id INTEGER REFERENCES pokemons(pokemon_id) ON DELETE CASCADE,
    type_id INTEGER REFERENCES types(type_id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id, type_id)
);

INSERT INTO pokemon_type (pokemon_id, type_id)
VALUES
    (1, 1);
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