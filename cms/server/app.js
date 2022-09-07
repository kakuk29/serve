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
app
    .use(morgan("dev"))
    .use(bodyParser.json())