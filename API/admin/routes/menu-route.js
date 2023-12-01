const express = require('express');
const route = express.Router();
const {
    newMenu,
    newDish,
    newVariant,
    newExtra,
    updateDish,
    updateVariant,
    updateExtra
} = require("../controllers/menu-controller");
const authorization = require('../../middlewares/authorization');

route.post('/', authorization('creates'), newMenu);
route.post('/dish', authorization('creates'), newDish);
route.post('/:id_dish/variant', authorization('creates'), newVariant);
route.post('/:id_dish/extra', authorization('creates'), newExtra);

route.put('/dish/:id', authorization('update'), updateDish);
route.put('/dish/variant/:id', authorization('update'), updateVariant);
route.put('/dish/extra/:id', authorization('update'), updateExtra);

module.exports = route;