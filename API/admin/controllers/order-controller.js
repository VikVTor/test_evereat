const db = require("../../db");
const {ServerError, ClientError} = require('../../customclass/Error');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const getOrders = (req, res, next) => {
    const id_restaurant = req.params.id;

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("SELECT * FROM `order` WHERE id_restaurant=?", [id_restaurant], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(StatusCodes.OK).json({content:result});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const getOrder = (req, res, next) => {
    const {id_restaurant, id_order} = req.params;

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("SELECT * FROM `order` WHERE id_restaurant=?, id_order=?", [id_restaurant, id_order], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                if (result.length > 0) res.status(StatusCodes.OK).json({content:result[0]});
                else next(new ClientError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const updateOrder = (req, res, next) => {
    const id_state = req.body.id_state;
    const {id_restaurant, id_order} = req.params;

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("UPDATE `order` SET id_state=? WHERE id_restaurant=?, id_order=?", [id_state, id_restaurant, id_order], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(StatusCodes.OK).json({});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

module.exports = {
    getOrders,
    getOrder,
    updateOrder
};