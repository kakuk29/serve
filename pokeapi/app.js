const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const pokemonmodl = require("./src/models/pokemon");

// routes
const pokeapi = require("./src/routes/api");

// initialize app
dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);

// database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`connected to ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.error(`impossible to connect to ${process.env.DB_NAME} : ${err}`);
  });

const Pokemon = pokemonmodl(sequelize, DataTypes);

sequelize.sync({ force: true })
.then(_ => console.log('Database & tables created!'))
  
// middleware
app
  .use(favicon(__dirname + `/public/images/favicon.ico`))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use("/pokemon/api", pokeapi);

// start the server
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}, press Ctrl+C to quit`);
});
