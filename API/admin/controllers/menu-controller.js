const db = require("../../db");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const {ServerError} = require("../../customclass/Error");

const newMenu = (req, res, next) => {
    const id_restaurant = req.body.id_restaurant;

    if (!id_restaurant) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    db.getConnection((error, connection) => {
        if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
        connection.query("INSERT INTO menu (id_restaurant) VALUES (?); SELECT * FROM menu;", [id_restaurant], (err, result) => {
            if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
            else {
                res.status(200).json({content:result[1][0]});
            }
        });
    });
}

const newDish = (req, res, next) => {
    const {name, id_menu} = req.body;

    if (!name || !id_menu) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("INSERT INTO dish (name, id_menu) VALUES (?, ?); SELECT * FROM dish", [name, id_menu], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(StatusCodes.OK).json({content:result[1][0]});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const newVariant = (req, res, next) => {
    const {name, img} = req.body;
    const {id_dish} = req.params;

    if (!name || !img || !id_dish) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("INSERT INTO variant (name, img, id_dish) VALUES (?, ?, ?); SELECT * FROM variant;", [name, img, id_dish], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({content:result[1][0]});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const newExtra = (req, res, next) => {
    const {name} = req.body;
    const {id_dish} = req.params;

    if (!name || !id_dish) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("INSERT INTO extra (name, id_dish) VALUES (?, ?); SELECT * FROM extra;", [name, id_dish], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({content:result[1][0]});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const updateDish = (req, res, next) => {
    const {name, id_menu} = req.body;
    const id_dish = req.params.id

    if (!name || !id_menu || !id_dish) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("UPDATE dish SET name=?, id_menu=? WHERE id_dish=?", [name, id_menu, id_dish], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const updateVariant = (req, res, next) => {
    const {name, img, id_dish} = req.body;
    const id_variant = req.params.id;

    if (!name || !img || !id_dish || !id_variant) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("UPDATE dish SET name=?, img=?, id_dish=? WHERE id_variant=?", [name, img, id_dish, id_variant], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const updateExtra = (req, res, next) => {
    const {name, id_dish} = req.body;
    const id_extra = req.params.id;

    if (!name || !id_dish || !id_extra) next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("UPDATE extra SET name=?, id_dish=? WHERE id_extra=?", [name, id_dish, id_extra], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

module.exports = {
    newMenu,
    newDish,
    newVariant,
    newExtra,
    updateDish,
    updateVariant,
    updateExtra
};