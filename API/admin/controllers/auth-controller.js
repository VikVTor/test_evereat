const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {ServerError, ClientError} = require('../../customclass/Error');

const login = (req, res, next) => {
    const {username, password} = req.body;
    
    if (!username || !password) { return next(new ClientError(StatusCodes.BAD_REQUEST)); }

    try {
        db.getConnection((error, connection) => {
            if (error) {
                return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            }
            connection.query("SELECT id_admin, username, password FROM admin WHERE username=?", [username], async (err, result) => {
                if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
                else if (result.length > 0) {
                    let access = await bcrypt.compare(password, result[0].password);
                    if (access) {
                        let token = jwt.sign({"id":result[0].id_admin}, "namtambao", { expiresIn: '2d' });
                        return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, token:token});
                    } else {
                        // login failed
                        return res.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
                    }
                }
                else {
                    return res.status(StatusCodes.NOT_FOUND).json({message:ReasonPhrases.NOT_FOUND});
                }
            });
        });
    } catch (error) {
        return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

const register = async (req, res, next) => {
    const {username, email, password} = req.body;
    
    if (!username || !email || !password) return next(new ServerError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));

    let hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

    try {
        db.getConnection((error, connection) => {
            if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
            connection.query(
                `INSERT INTO admin (username, email, password)
                VALUES (?, ?, ?);`,
                [username, email, hashed_password], (err, result) => {
                    if (err) return next(StatusCodes.INTERNAL_SERVER_ERROR, err);
                    return res.status(StatusCodes.OK).json({message:ReasonPhrases.OK});
                }
            );
        });
    } catch (error) {
        return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    }
}

module.exports = {login, register};