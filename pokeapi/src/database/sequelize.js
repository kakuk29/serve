const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const pokemonmodl = require("../models/pokemon");
const pokemons = require("./mock_pokemon");

dotenv.config();

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
  });

const Pokemon = pokemonmodl(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then(() => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      }).then((pokemon) => console.log(pokemon.toJson()));
    });
    console.log(`Database & tables created!`);
  });
};

module.exports = { initDb };

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(`connecter à ${process.env.DB_NAME}`);
//   })
//   .catch((err) => {
//     console.error(`impossible to connect to ${process.env.DB_NAME} : ${err}`);
//   });
