const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = "mongodb://mongodb:27017"; // ici on va utiliser le mongo téléchargé et exécuté depuis dockerhub.
// mongodb (remplaçant localhost) est le lien déclaré dans docker-compose.yml

let db ;
MongoClient.connect(url, function(err, client) {
  if (err) { console.log(err) }
  db = client.db('animaux');
});

app.get("/insertAnimal", async (req, res) => {
  try {
    await db
      .collection("animaux")
      .insertOne({ name: "JOJO", weight: 40, gender: "m" });
  } catch (e) {
    console.log(e);
  }
  res.redirect("animaux");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cool", (req, res) => {
  res.send("You are cool!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
