const express = require('express')
const router = new express.Router();
const User = require("../models/User");

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

module.exports = Router;