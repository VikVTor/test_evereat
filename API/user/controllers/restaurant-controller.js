const db = require('../../db');
const { v4: uuid } = require('uuid');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { ServerError, ClientError } = require('../../customclass/Error');
const { supabase } = require('../../db');

const getAll = async (req, res, next) => {
    // db.getConnection((error, connection) => {
    //     if (error) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //     const query =  `SELECT *, COUNT(reviews.id_review) AS reviews_count, AVG(reviews.stars) AS stars, deliver_options.delivery_price, deliver_options.min_order
    //                     FROM restaurant
    //                     WHERE restaurant.archived=0
    //                     INNER JOIN reviews ON restaurant.id_restaurant=reviews.id_restaurant
    //                     INNER JOIN deliver_options ON restaurant.id_restaurant=deliver_options.id_restaurant
    //                     GROUP BY reviews.id_review, deliver_options.id_deliver_opt;
    //     `;
    //     connection.query(query, [], (err, result) => {
    //         if (err) next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //         return res.status(StatusCodes.OK).json({message:ReasonPhrases.OK, content: result});
    //     });
    // });

    let {data, error} = await supabase
        .from('restaurant')
        .select(`
            *,
            reviews (*),
            deliver_options (*)
    `);

    if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    return res.status(StatusCodes.OK).json({message:ReasonPhrases.OK, content: data});
}

const getOne = async (req, res, next) => {
    const {id_restaurant} = req.params;

    const queries = {
        restaurant  :  `SELECT *
                        FROM restaurant
                        WHERE id_restaurant=?`,
        menu        :  `SELECT *
                        FROM menu
                        WHERE id_restaurant=?`,
        dish        :  `SELECT *
                        FROM dish
                        WHERE id_menu=?`,
        variant     :  `SELECT *
                        FROM variant
                        WHERE id_dish=?`
    };

    // db.getConnection((error, connection) => {
    //     if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //     connection.query(queries.restaurant, [id_restaurant], (err, restaurant) => {
    //         if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //         else if (restaurant.length > 0) {
    //             connection.query(queries.menu, [id_restaurant], (err, menu) => {
    //                 if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //                 else if (menu.length > 0) {
    //                     connection.query(queries.dish, [menu[0].id_menu], async (err, dishes) => {
    //                         if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //                         else if (dishes.length > 0) {
    //                             const variants = {};
    //                             let counter = 0;
    //                             dishes.map((dish) => {
    //                                 connection.query(queries.variant, [dish.id_dish], (err, result) => {
    //                                     if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //                                     variants[dish.name] = result;
    //                                     console.log(result);
    //                                     counter++;
    //                                     if (counter === dishes.length) {
    //                                         return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK, content: {
    //                                             restaurant: restaurant[0],
    //                                             menu: menu[0],
    //                                             dishes,
    //                                             variant
    //                                         }});
    //                                     }
    //                                 });
    //                             });
    //                         }
    //                         else return next(new ServerError(StatusCodes.NO_CONTENT, "Dish created but no there's not any variant"));
    //                     });
    //                 }
    //                 else return res.status(StatusCodes.NOT_FOUND).json({message:"No menu found"});
    //             });
    //         }
    //         else return next(new ClientError(StatusCodes.NOT_FOUND));
    //     });
    // });

    let {data, error} = await supabase
        .from('restaurant')
        .select(`
            *,
            menu (
                *,
                dish (
                    *,
                    variants (*),
                    extra (*)
                )
            ),
            reviews (*),
            deliver_options (*)
        `)
        .eq('id_restaurant', id_restaurant);
}

const postReview = async (req, res, next) => {
    const { stars, date, text, id_user } = req.body;
    const { id_restaurant } = req.params;

    if (!stars || !date || !text || !id_user) return next(new ClientError(StatusCodes.BAD_REQUEST));

    // db.getConnection((error, connection) => {
    //     if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    //     connection.query("INSERT INTO reviews (stars, date, text, id_user, id_restaurant) VALUES (?, ?, ?, ?, ?)", [stars, date, text, id_user, id_restaurant], (err, result) => {
    //         if (err) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, err));
    //         return res.status(StatusCodes.OK).json({message:StatusCodes.OK});
    //     });
    // });

    let {error} = await supabase
        .from('reviews')
        .insert({
            id_review: uuid(),
            stars,
            date,
            text,
            id_user,
            id_restaurant
        }
    );

    if (error) return next(new ServerError(StatusCodes.INTERNAL_SERVER_ERROR, error));
    return res.status(StatusCodes.OK).json({message: ReasonPhrases.OK});
}

const setFavourite = (req, res, next) => {
    const {} = req.body;

    // verificare i parametri richiesti

    db.getConnection((error, connection) => {
        // salvare il ristorante da qualche parte
    });
}

module.exports = {
    getAll,
    getOne,
    postReview
};