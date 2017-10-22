const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../config/config');

const User = require('../models/User');


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            if (user.password !== req.body.password) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication failed. Wrong Password.'
                });
            } else {
                return res.status(200).json({
                    token: jwt.sign({
                        email: user.email,
                        name: user.name,
                        _id: user._id
                    },config.secret)
                });
            }
        }
    });
});

module.exports = router;