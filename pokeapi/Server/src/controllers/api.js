let pokemons = require("../database/mock_pokemon");

const getUniqueId = (array) => {
  let id = 1;
  if (array.length > 0) {
    id = array[array.length - 1].id + 1;
  }
  return id;
};

exports.getAllPokemon = (req, res) => {
  const pokemon = pokemons;
  const message = pokemon
    ? `il y a ${pokemons.length} pokemons`
    : `il n'y a pas de pokemons`;
  res.json({ status: 200, message: message, data: pokemon });
};

exports.getOnePokemon = (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((p) => p.id == id);
  const message = pokemon
    ? `un pokemon a bien été trouver`
    : `Bruit de cricket`;
  res.json({ status: 200, message: message, data: pokemon });
};

exports.createPokemon = (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été créer`;
  res.json({ status: 200, message: message, data: pokemonCreated });
};

exports.updatePokemon = (req, res) => {
  const id = req.params.id;
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((p) => {
    return p.id == id ? pokemonUpdated : p;
  });
  const message = `le pokemon ${pokemonUpdated.name} a bien été mis à jour`;
  res.json({ status: 200, message: message, data: pokemonUpdated });
};

exports.deletePokemon = (req, res) => {
  const id = req.params.id;
  const pokemonDeleted = pokemons.find((p) => p.id == id);
  pokemons = pokemons.filter((p) => p.id != id);
  const message = `le pokemon ${pokemonDeleted.name} a bien été supprimer`;
  res.json({ status: 200, message: message, data: pokemonDeleted });
};

exports.deleteAllPokemon = (req, res) => {
  pokemons = [];
  const message = `Tous les pokemons ont bien été supprimer`;
  res.json({ status: 200, message: message, data: pokemons });
};
