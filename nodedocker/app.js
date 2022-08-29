const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/cool", (req, res) => {
  res.send("You are cool!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
