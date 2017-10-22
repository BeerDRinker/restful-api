const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../config/config');

const User = require('../models/User');


//Register new User
router.post('/register', function (req, res) {

    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }, function (err, user) {

        if (err) {
            return res.status(400).send("There was a problem registering the user.")
        }

        let token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(201).send({
            auth: true,
            token: token
        });

    });
});

module.exports = router;