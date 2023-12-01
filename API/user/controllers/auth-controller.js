const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { supabase } = require("../../db");
const { v4: uuid } = require('uuid');
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { ClientError, ServerError } = require("../../customclass/Error");

const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) { return next(new ClientError(StatusCodes.BAD_REQUEST)) }

    // try {
    //     db.getConnection((error, connection) => {
    //         if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //         connection.query("SELECT id_user, email, password FROM user WHERE email=?", [email], async (err, result) => {
    //             if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //             else if (result.length > 0) {
    //                 let access = await bcrypt.compare(password, result[0].password);
    //                 if (access) {
    //                     let token = jwt.sign({"id":result[0].id_user}, "namtambao", { expiresIn: '2d' });
    //                     return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, token:token});
    //                 } else {
    //                     next(new ClientError(StatusCodes.NOT_FOUND));
    //                 }
    //             } else {
    //                 next(new ClientError(StatusCodes.NOT_FOUND));
    //             }
    //         });
    //     });
    // } catch (error) {
    //     next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    // }

    let { data, error } = await supabase
        .from('user')
        .select(`*`)
        .eq('email', email);
    
    if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    if (data.length > 0) {
        let access = await bcrypt.compare(password, data[0].password);
        if (access) {
            let token = jwt.sign({id: data[0].id_user}, "namtambao", {expiresIn: '2d'});
            return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, token: token});
        } else {
            return next(new ClientError(StatusCodes.NOT_FOUND));
        }
    } else {
        return next(new ClientError(StatusCodes.NOT_FOUND));
    }
}

const register = async (req, res, next) => {
    const {name, surname, email, telephone, password, city, route, street_number, cap, state} = req.body;

    if (!name || !surname || !email || !telephone || !password || !city || !route || !street_number || !cap || !state) { return next(new ClientError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)); }

    let hashed_password = await bcrypt.hash(password, await bcrypt.genSalt());

    // try {
    //     db.getConnection((error, connection) => {
    //         if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //         connection.query(
    //         `INSERT INTO user (name, surname, email, telephone, password, address)
    //         VALUES (?, ?, ?, ?, ?, ?);`,
    //         [name, surname, email, telephone, hashed_password, address], (err, result) => {
    //             if (err) next(StatusCodes.INTERNAL_SERVER_ERROR, err);
    //             else if (result.affectedRows > 0) {
    //                 return res.status(200).json({message: ReasonPhrases.OK});
    //             }
    //             else {
    //                 next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, "unknown error : account not registered"));
    //             }
    //         });
    //     });
    // } catch (error) {
    //     next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    // }

    let { error } = await supabase
        .from('user')
        .insert({
            id_user: uuid(),
            name,
            surname,
            email,
            telephone,
            password: hashed_password,
            city,
            route,
            street_number,
            cap,
            state
        }
    );

    console.error(error);
    if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK});
}

module.exports = {login, register};