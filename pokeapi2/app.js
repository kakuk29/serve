const express = require("express");
let pokemons = require("./mock_pockemon");
const dotenv = require("dotenv");
const { success } = require("./helper.js");
dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3000);

// middleware

// app.use((req, res, next) => {
//   console.log(`URL: ${req.url}`);
//   next();
// });

app.get("/api/pokemon", (req, res) => {
  const pokemon = pokemons;
  const message = pokemon
    ? `il y a ${pokemons.length} pokemons`
    : `il n'y a pas de pokemons`;
  res.json(success(message, pokemon));
});

app.get("/api/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((p) => p.id == id);
  const message = pokemon
    ? `un pokemon a bien été trouver`
    : "Bruit de cricket";
  res.json(success(message, pokemon));
});

// start the server
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}, press Ctrl+C to quit`);
});
