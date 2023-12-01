const express = require('express');
const route = express.Router();
const {getAll, getOne, postReview} = require('../controllers/restaurant-controller');

route.get('/', getAll);
route.get('/:id_restaurant', getOne);
route.post('/:id_restaurant/review', postReview);

module.exports = route;