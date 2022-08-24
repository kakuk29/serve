const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3000);



app.get("/", (req, res) => {
  res.send("Hello node");
});

app.get("/api/pokemon/:id", (req, res) => {
    res.send(`vous avez demandé le pokemon n°${req.params.id}`);
});


// start the server
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}, press Ctrl+C to quit`);
});
