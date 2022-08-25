const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const pokeapi = require("./routers/api");

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3000);

app
  .use(favicon(__dirname + `/public/images/favicon.ico`))
  .use(morgan("dev"))
  .use('/pokemon/api', pokeapi);

// start the server
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}, press Ctrl+C to quit`);
});

