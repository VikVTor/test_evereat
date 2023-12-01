const express = require('express');
const route = express.Router();
const { getOrders, getOrder, updateOrder } = require('../controllers/order-controller');
const authorization = require('../../middlewares/authorization');

route.get('/:id', getOrders);
route.get('/:id_restaurant/:id_order', authorization, getOrder);
route.put('/:id_restaurant/:id_order', authorization, updateOrder);

module.exports = route;