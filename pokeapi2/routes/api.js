const express = require("express");
const routeur = express.Router();

const pokemonsCtrl = require('../controllers/api');

routeur.get("/", pokemonsCtrl.getAllPokemon);
routeur.get("/:id", pokemonsCtrl.getOnePokemon);
routeur.post("/", pokemonsCtrl.createPokemon);

module.exports = routeur;
