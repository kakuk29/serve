const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const https = require("https");
const { success } = require("./helper.js");

const app = express();
const port = 3000;

let pokemons = https
  .get("https://pokeapi.co/api/v2/pokemon", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    })

    res.on("end", () => {
      pokemons = JSON.parse(data).results;
    })

}).on("error", (err) => {
    console.log("Error: " + err.message);
})

// middleware
app
  .use(favicon(__dirname + "/public/favicon.ico"))
  .use(morgan("dev"));

// routes
app.get("/", (req, res) => res.send("Index Page"));

app.get("/api/pokemon", (req, res) => {
  const message = pokemons ? `${pokemons.length} pokemon trouvés`: `Aucun pokemon trouvé`;
  res.json(success(message, pokemons));
});

app.get("/api/v2/pokemon/:id", (req, res) => { // :id is a placeholder for the id of the pokemon
  const id = parseInt(req.params.id); // parseInt convertie une chaine de caractere en un nombre
  const pokemon = pokemons.find((pokemon) => pokemon.id === id); // find returns the first element that satisfies the condition
  const message = pokemon ? `un ${pokemon.name} sauvage apparait` : `pas de pokemon trouvé`; // if pokemon is not null, we display a message with the name of the pokemon
  res.send(success(message, pokemon));
});



// start the server
app.listen(port, () =>
  console.log(
    `application lancé sur l'adresse : http://localhost:${port}, press Ctrl+C to stop, or Ctrl+Shift+C to quit.`
  )
);
