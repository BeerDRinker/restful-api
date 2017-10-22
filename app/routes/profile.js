const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const config = require('./../config/config');

const User = require('../models/User');

router.get('/profile', ensureToken, function(req, res) {
  console.log(req.body.email);
  jwt.verify(req.token, config.secret, function(err, data) {
    if (err) {
      res.status(401);
    } else {
      res.status(200).json({
        description: 'Protected information. Congrats!',
      });
    }
  });
});

function ensureToken(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(401).send({ auth: false, message: 'No token provided.' }); 
  }
  
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(401);
  }
}

module.exports = router;