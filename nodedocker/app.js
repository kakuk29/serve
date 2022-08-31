const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

const url = "mongodb://mongodb:27017"; // ici on va utiliser le mongo téléchargé et exécuté depuis dockerhub.
// mongodb (remplaçant localhost) est le lien déclaré dans docker-compose.yml

port = 8080

let db;
MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log(err);
  }
  db = client.db("animaux");
});

app.get("/insertAnimal", async (req, res) => {
  try {
    await db
    .collection("animaux")
    .insertOne({
      nom: "chien",
      age: 2,
    });
    res.send("ok");
  } catch (err) {
    res.send(err);
  }
}),

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cool", (req, res) => {
  res.send("You are cool!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
