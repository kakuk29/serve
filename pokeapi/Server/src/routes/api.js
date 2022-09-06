const express = require("express");
const routeur = express.Router();
const pokemonsCtrl = require('../controllers/api');


// routes
routeur.get("/", pokemonsCtrl.getAllPokemon);
routeur.get("/:id", pokemonsCtrl.getOnePokemon);
routeur.post("/", pokemonsCtrl.createPokemon);
routeur.put("/:id", pokemonsCtrl.updatePokemon);
routeur.delete("/:id", pokemonsCtrl.deletePokemon);
routeur.delete("/", pokemonsCtrl.deleteAllPokemon);

// export
module.exports = routeur;
