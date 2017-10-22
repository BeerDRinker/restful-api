const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser');
const logger = require('morgan');


const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
        useMongoClient: true
    })
    .then(() => console.log('Connected to DB succesfuly...'))
    .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(logger('dev'));

const register = require('./routes/register');
app.use('/api', register);

const login = require('./routes/login');
app.use('/api', login);

const profile = require('./routes/profile');
app.use('/api', profile);

module.exports = app;