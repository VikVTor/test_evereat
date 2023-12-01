const express = require("express");
const authentication = require('../middlewares/authentication');
const auth = require("./routes/auth-route");
const restaurant = require("./routes/restaurant-route");
const menu = require("./routes/menu-route");
const order = require("./routes/order-route");
const discount = require("./routes/discount-route");
const api = express();

api.use(express.json());

api.use('/auth', auth);
api.use('/restaurant', authentication, restaurant);
api.use('/menu', authentication, menu);
api.use('/order', authentication, order);
api.use('/discount', authentication, discount);

module.exports = api;