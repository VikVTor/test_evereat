const jwt = require('jsonwebtoken');
const db = require('./../db');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {ServerError, ClientError} = require('../customclass/Error');

// const authentication = (req, res, next) => {
//     try {
//         var authHeader = req.headers["authorization"];
//         var token = authHeader.split(" ")[1];
//     } catch (error) {}

//     if (!token) {
//         // res.json({status:false, message:"You're not authorized to use this endpoint"});
//         res.status(401).json({message:"You're not authorized to use this endpoint"});
//         res.end();
//     } else {
//         jwt.verify(token, "namtambao", (err, account) => {
//             let today = new Date();
//             if (err) {
//                 // res.json({status:false, message:"An error occured while checking your authorization"});
//                 res.status(500).json({message:"An error occured while checking your authorization"});
//             } else if (true) {
//                 req.id = account.id;
//                 console.log(account);
//                 next();
//             } else {
//                 // res.json({status:false, message:"The provided access token has expired"});
//                 res.status(403).json({message:"The provided access token has expired"});
//                 res.end();
//             }
//         });
//     }
// }

const authentication = (req, res, next) => {
    try {
        var authHeader = req.headers["authorization"];
        var token = authHeader.split(" ")[1];
    } catch (error) {
        next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
    
    if (!token) next(new ClientError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED));
    else {
        jwt.verify(token, "namtambao", (err, decodedToken) => {
            if (err) {
                next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
            } else if (new Date(decodedToken.exp*1000) > new Date()) {
                req.id = decodedToken.id;
                next();
            } else {
                next(new ClientError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN));
            }
        });
    }
}

module.exports = authentication;