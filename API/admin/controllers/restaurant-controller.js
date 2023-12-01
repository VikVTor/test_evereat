const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const db = require("../../db");
const {ServerError, ClientError} = require("../../customclass/Error");

const newRestaurant = (req, res, next) => {
    const {business_name, street_number, route, city, state, gmap_position, email, telephone, logo} = req.body;
    const id_admin = req.id;
    
    if (!business_name || !street_number || !route || !city || !state || !gmap_position || !email || !telephone || !logo) {
        next(new ClientError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));
    }
    
    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query(
                `INSERT INTO restaurant (business_name, street_number, route, city, state, gmap_position, email, telephone, logo, id_admin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); SELECT * FROM restaurant;`, [business_name, street_number, route, city, state, gmap_position, email, telephone, logo, id_admin],
            (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                else if (true) {
                    res.status(StatusCodes.OK).json({content:result[1][0]});
                } else {
                    next(new ClientError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
                }
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

// const updateRestaurant = (req, res, next) => {
//     const {business_name, address, gmap_position, email, telephone, logo, username, password} = req.body;

//     try {
//         db.getConnection((error, connection) => {
//             if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
//             let query = `
//                 UPDATE restaurant SET 
//                 ${business_name?`business_name="${business_name}"`:""}
//                 ${address?`address="${address}"`:""}
//                 ${gmap_position?`gmap_position="${gmap_position}"`:""}
//                 ${email?`email="${email}"`:""}
//                 ${telephone?`telephone="${telephone}"`:""}
//                 ${logo?`logo="${logo}"`:""}
//                 ${username?`username="${username}"`:""}
//                 ${password?`password="${password}"`:""}
//                 WHERE id_restaurant="${req.id}"`;
//             connection.query(query, [], (err, result) => {
//                 if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
//                 return res.status(200).json({message:"0010"});
//             }); 
//         });
//     } catch (error) {
//         return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
//     }
// }

const updateRestaurant = (req, res, next) => {
    const {id_restaurant, business_name, street_number, route, city, state, gmap_position, email, telephone, logo} = req.body;
    const restaurant = {business_name, street_number, route, city, state, gmap_position, email, telephone, logo};

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("UPDATE restaurant SET ? WHERE id_restaurant=?", [restaurant, id_restaurant], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                res.status(200).json({});
            }); 
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const deleteRestaurant = (req, res, next) => {
    const id_restaurant = req.params.id;

    if (id_restaurant) next(new ClientError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    try {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("DELETE FROM restaurant WHERE id_restaurant=?", [id_restaurant], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                else res.status(200).json({});
            });
        });
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

module.exports = {newRestaurant, updateRestaurant, deleteRestaurant};