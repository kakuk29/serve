exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pokemons) => {
  const pokemonsids = pokemons.map(pokemon => pokemon.id);
  const maxId = pokemonsids.reduce((a,b) => Math.max(a,b));
  const uniqueId = maxId + 1;
  return uniqueId;
}