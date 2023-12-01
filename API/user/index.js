const express = require("express");
const api = express();
const auth = require("./routes/auth-route");
const restaurant = require('./routes/restaurant-route');

api.use(express.json());

api.use('/auth', auth);
api.use('/restaurant', restaurant);

module.exports = api;