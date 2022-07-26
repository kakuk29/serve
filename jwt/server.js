//------
// npm i --save express mongoose cors jsonwebtoken bcryptjs path
//------
const dotenv = require("dotenv");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const cors = require("cors");
const express = require("express");

// recupération du contenue .env (ici TOKEN_SECRET)
dotenv.config();
const app = express();
require("./models/user.js");
var User = mongoose.model("User");

app.use(cors());
//pour pouvoir interpréter le req.body
app.use(express.urlencoded({ extended: true }));
// pour l'echange de donnée en json
app.use(express.json());

/*
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
*/

var db = mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } 
});

function generateAccessToken(user){
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
  /*
  pour postman dans le req.headers.authorization j'ai ceci :
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyZGU2ZWU1NjE1NGM4YjNiZGI1ODAyMyIsImVtYWlsIjoiam9uaTRAZ21haWwuY29tIiwibm9tIjoiam9uaTQiLCJwcmVub20iOiJiaWdvdWQiLCJwYXNzd29yZCI6IiQyYSQxMCR4UTJneVdNdDl6cW9pclZCREtsaVF1aGFHb3pqdmRjcjFOSDdVYlBWUEZla2h1alNkMDJKaSIsIl9fdiI6MH0sImlhdCI6MTY1ODc0NTE1MCwiZXhwIjoxNjU4NzQ4MTUwfQ.BZxS8o550wDXRj3EP05hGVTUaA2d-lBN5cuvLsazI3s
  je doit donc spliter le Bearer et le token et le stocker dans une variable
  */
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.headers.authorization
  console.log("TOKEN", token);
  if (token == null) {
    return res.sendStatus(401);
  } // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/user/signup", (req, res) => 
{
  console.log(req.body);
  // si le user existe
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
        nom: req.body.nom,
        prenom: req.body.prenom,
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


app.listen(8092, () => {
  console.log("Server started on http://localhost:8092");
})
