let pokemons = require("../database/mock_pokemon")
const { success } = require("../../helper.js");
const { getUniqueId } = require("../../helper.js");

exports.getAllPokemon = (req, res) => {
  const pokemon = pokemons;
  const message = pokemon
    ? `il y a ${pokemons.length} pokemons`
    : `il n'y a pas de pokemons`;
  res.json(success(message, pokemon));
};

exports.getOnePokemon = (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((p) => p.id == id);
  const message = pokemon
    ? `un pokemon a bien été trouver`
    : `Bruit de cricket`;
  res.json(success(message, pokemon));
};

exports.createPokemon = (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été créer`;
  res.json(success(message, pokemonCreated));
};

exports.updatePokemon = (req, res) => {
  const id = req.params.id;
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((p) => {
    return p.id == id ? pokemonUpdated : p;
  });
  const message = `le pokemon ${pokemonUpdated.name} a bien été mis à jour`;
  res.json(success(message, pokemonUpdated));
};

exports.deletePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id == id);
  pokemons.filter(pokemon => pokemon.id !== id);
  const message = `le pokemon ${pokemonDeleted.name} a bien été supprimer`;
  res.json(success(message, pokemonDeleted));
}