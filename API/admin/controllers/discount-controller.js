const db = require("../../db");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ClientError, ServerError } = require("../../customclass/Error");

const newDiscount = (req, res, next) => {
    const {discount, id_restaurant, id_dish} = req.body;

    if (!discount || !id_restaurant || !id_dish) next(new ClientError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    db.getConnection((error, connection) => {
        if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
        connection.query("INSERT INTO discount (discount, id_restaurant, id_dish) VALUES (?, ?, ?); SELECT * FROM discount;", [discount, id_restaurant, id_dish], (err, result) => {
            if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
            else {
                res.status(StatusCodes.OK).json({content: result[1][0]});
            }
        });
    });
}

const updateDiscount = (req, res, next) => {
    const id_discount = req.params.id_discount;
    const {discount, id_restaurant, id_dish} = req.body;

    db.getConnection((error, connection) => {
        if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
        connection.query("UPDATE discount SET ? WHERE id_discount=?", [{discount, id_restaurant, id_dish}, id_discount], (err, result) => {
            if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
            else {
                res.status(StatusCodes.OK).json({});
            }
        });
    });
}

module.exports = {
    newDiscount,
    updateDiscount
};