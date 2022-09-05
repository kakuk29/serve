const sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const pokemonmdl = require("../models/pokemon");
const pokemons = require("./mock_pokemon");
const pokemon = require("../models/pokemon");

const db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false,
  }
);

const pokemonModel = pokemonmdl(db, sequelize);

const initDb = async () => {
  try {
    
    await db.authenticate();
    console.log(`${process.env.DB_NAME} database connected`);
    await db.sync({ force: true });
    console.log(`${process.env.DB_NAME} database synced`);
    pokemon.map((pokemon) => {
      pokemonModel
        .create({
          name: pokemons.name,
          hp: pokemons.hp,
          cp: pokemons.cp,
          picture: pokemons.picture,
          type: pokemons.type.join(),
        })
        .then((pokemon) => {
          console.log(pokemon.toJSON());
        });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  initDb,
};
