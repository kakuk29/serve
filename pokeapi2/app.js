const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const favicon = require("serve-favicon");

let pokemons = require("./mock_pockemon");
const { success } = require("./helper.js");
const { getUniqueId } = require("./helper.js");

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3000);

// middleware

// app.use((req, res, next) => {
//   console.log(`URL: ${req.url}`);
//   next();
// });

app
  .use(favicon(__dirname + `/public/images/favicon.ico`))
  .use(morgan("dev"));

app.get("/api/pokemon", (req, res) => {
  const pokemon = pokemons;
  const message = pokemon ? `il y a ${pokemons.length} pokemons` : `il n'y a pas de pokemons`;
  res.json(success(message, pokemon));
});

app.get("/api/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((p) => p.id == id);
  const message = pokemon ? `un pokemon a bien été trouver`: `Bruit de cricket`;
  res.json(success(message, pokemon));
});

app.post("/api/pokemon", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été créer`;
  res.json(success(message, pokemonCreated));
});
// start the server
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}, press Ctrl+C to quit`);
});
