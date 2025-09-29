#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS pokemons;
DROP TABLE IF EXISTS types;
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

INSERT INTO pokemons (name)
VALUES
    ('Pikachu'),
    ('Charmander');




CREATE TABLE IF NOT EXISTS types (
    type_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

INSERT INTO types (name)
VALUES
    ('Fire'),
    ('Water');



CREATE TABLE IF NOT EXISTS pokemon_type (
    pokemon_id INTEGER REFERENCES pokemons(pokemon_id) ON DELETE CASCADE,
    type_id INTEGER REFERENCES types(type_id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id, type_id)
);
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