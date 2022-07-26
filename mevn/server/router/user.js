const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/users', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.status(201).send(users);
    })
})

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id).then((user) => {
        res.status(201).send(user);
    })
})

router.post("/signup", (req, res) => {
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

router.post("/login", (req, res) => {
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

module.exports = router