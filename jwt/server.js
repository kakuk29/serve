//------
// npm i --save express mongoose cors jsonwebtoken bcryptjs path
//------
const dotenv = require("dotenv");
const parth = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const cors = require("cors");

const express = require("express");
// recupération du contenue .env (ici TOKEN_SECRET)
dotenv.config();

const app = express();

require("./models/User");

var User = mongoose.model("users");

app.use(cors());
//pour pouvoir interpréter le req.body
app.use(express.urlencoded({ extended: true }));
// pour l'echange de donnée en json
app.use(express.json());

/*
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(parth.join(__dirname, 'public', 'index.html'));
});
*/

var db = mongoose.connect("mongodb://localhost/afpauser");

function genreateAccesToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "50m" });
}

/*
exiresIn options
'2 days' // 172800000
'1d' // 86400000
'10h' // 36000000
'2.5 hrs' // 9000000
'2h' // 7200000
'1m' // 60000
'5s' // 5000
'1y' // 31557600000
'100' // 100
*/

//-------------------middleware de verification ------
function authenticateToken(req, res, next) {
  // const token = req.headers['x-access-token']
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  //const token = req.headers.authorization
  console.log("TOKEN", token);
  if (token == null) {
    return res.sendStatus(401);
  } // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution to the next middleware
  });
}

app.post("/user/signup", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (user) {
      // si le user existe
      res.status(400).send({ message: "Email existe deja!" });
    } else {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      // creation de l'objet user à partir de la modelisation User mongoose
      var user = new User({
        name: req.body.name,
        password: hash,
        email: req.body.email,
      });
      user.save(function (err) {
        if (err) return handleError(err);
        res.status(200).send(user);
      });
    }
  }); // end exec
}); // end post

app.post("/user/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    if (!user) {
      console.log("no user");
      return res.status(404).send({ message: "User Not found." });
    }

    if (user) {
      const isValidPass = bcrypt.compareSync(req.body.password, user.password);
      if (isValidPass) {
        const token = generateAccessToken({ user: user });
        res.status(200).send(token);
      }
    }
  });
});
// test du token
app.get("/api/orders", authenticateToken, function (req, res) {
  console.log("OK TU PASSES!!");
  res.send("Pass OK !!!");
});


app.listen(8092);
console.log("8092");
