const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/database/sequelize");

// routes
const app = express();

// initialize app
dotenv.config();
app.set("port", process.env.PORT || 3000);

// middleware
app.use(morgan("dev")).use(bodyParser.json());

// routes


// start server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

/*
creer un fichier .env dans le dossier server
puis ajouter les variables d'environnement :

PORT = 

DB_NAME = 'nom de la base de données'
DB_USER = 'nom d'utilisateur'
DB_PASSWORD = 'mot de passe'
DB_HOST = 'nom de l'hote'
*/
