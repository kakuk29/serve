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
    pokemons.map(async (pokemon) => {
      await pokemonModel.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      });
    });
  } catch (error) {
    console.error(` Error: ${error}`);
  }
};

module.exports = {
  initDb,
};
