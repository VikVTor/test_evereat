require('dotenv').config({path:__dirname+'/.env'});
const express = require("express");
const api = express();
const admin = require("./admin/index");
const user = require("./user/index");

api.use(express.json());

api.use('/admin', admin);
api.use('/user', user);

// api.use(errorHandler);

module.exports = api;