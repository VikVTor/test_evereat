const express = require('express');
const route = express.Router();
const {newRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurant-controller');
const authorization = require('../../middlewares/authorization');

route.post('/', newRestaurant);
route.put('/', updateRestaurant);
// route.delete('/:id', authentication, deleteRestaurant);

module.exports = route;