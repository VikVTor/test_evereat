const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const {ServerError, ClientError} = require("../customclass/Error");
const db = require("../db");

const authorization = (permission) => {
    return (req, res, next) => {
        db.getConnection((error, connection) => {
            if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query("SELECT * FROM admin WHERE id_admin=?", [req.id], (err, result) => {
                if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                else if (result.length > 0) {
                    if (result[0][permission] === 1) {
                        next();
                    } else {
                        next(new ClientError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED));
                    }
                } else {
                    next(new ClientError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN));
                }
            });
        });
    }
};

module.exports = authorization;

// const authorization = (permission) => {
//     return async (req, res, next) => {
//         const permissions = permission.split(" ");
//         function callback () { ok ? next() : res.status(200).json({message:"0006"}); }

//         const queries = {
//             sales : "SELECT sales FROM admin WHERE id_admin=? AND sales='1'",
//             edit : "SELECT edit FROM admin WHERE id_admin=? AND edit='1'",
//             create : "SELECT `create` FROM admin WHERE id_admin=? AND `create`='1'",
//             archive : "SELECT archive FROM admin WHERE id_admin=? AND archive='1'",
//             stats : "SELECT stats FROM admin WHERE id_admin=? AND stats='1'",
//             user_details : "SELECT user_details FROM admin WHERE id_admin=? AND user_details='1'"
//         };

//         var ok = true;
//         var counter = 0;
//         permissions.forEach(async perm => {
//             db.getConnection((error, connection) => {
//                 if (error) return next("0002");
//                 connection.query(queries[perm], [req.id], (err, result) => {
//                     if (err) return next("0001");
//                     if (result.length == 0) ok = false;
//                     counter++;
//                     if (counter === permissions.length) callback();
//                 });
//             });
//         });
//     }
// };

// module.exports = authorization;