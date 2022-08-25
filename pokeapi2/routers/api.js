const express = require("express");
const routeur = express.Router();

let pokemons = require("../mock_pockemon");
const { success } = require("../helper.js");
const { getUniqueId } = require("../helper.js");


routeur.get("/", (req, res) => {
  const pokemon = pokemons;
  const message = pokemon
    ? `il y a ${pokemons.length} pokemons`
    : `il n'y a pas de pokemons`;
  res.json(success(message, pokemon));
});

routeur.get("/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((p) => p.id == id);
  const message = pokemon
    ? `un pokemon a bien été trouver`
    : `Bruit de cricket`;
  res.json(success(message, pokemon));
});

routeur.post("/", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été créer`;
  res.json(success(message, pokemonCreated));
});

module.exports = routeur;