const express = require("express");
const route = express.Router();
const { newDiscount, updateDiscount } = require("../controllers/discount-controller");

route.post('/', newDiscount);
route.put('/', updateDiscount);

module.exports = route;