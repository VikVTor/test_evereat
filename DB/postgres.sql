-- supabase db passoword
-- WVYVWc85roQBrUlJ


CREATE TABLE admin (
    id_admin VARCHAR(64) PRIMARY KEY,
    username VARCHAR(64),
    password VARCHAR(256),
    email VARCHAR(128),
    sales BOOLEAN DEFAULT (true),
    edit BOOLEAN DEFAULT (true),
    creates BOOLEAN DEFAULT (true),
    archive BOOLEAN DEFAULT (true),
    stats BOOLEAN DEFAULT (true),
    user_details BOOLEAN DEFAULT (true)
);

CREATE TABLE restaurant (
    id_restaurant VARCHAR(64) PRIMARY KEY,
    business_name VARCHAR(1024),
    street_number INT,
    route VARCHAR(256),
    city VARCHAR(256),
    state VARCHAR(256),
    gmap_latitude VARCHAR(256), -- latitude
    gmap_longitude VARCHAR(256), -- longitude
    email VARCHAR(128),
    telephone VARCHAR(64),
    logo VARCHAR(256),
    archived BOOLEAN
);

CREATE TABLE admin_restaurant (
    id_admin VARCHAR(64),
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_admin) REFERENCES admin (id_admin),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE "user" (
    id_user VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64),
    surname VARCHAR(64),
    email VARCHAR(128),
    telephone VARCHAR(64),
    password VARCHAR(256),
    -- username VARCHAR(64),
    city VARCHAR(256),
    route VARCHAR(256),
    street_number INT,
    cap VARCHAR(5),
    state VARCHAR(256)
);

CREATE TABLE rider (
    id_rider VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64),
    surname VARCHAR(64),
    email VARCHAR(128),
    password VARCHAR(256),
    street_number INT,
    route VARCHAR(256),
    city VARCHAR(256),
    state VARCHAR(256),
    mean_transport VARCHAR(64),
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE reviews (
    id_review VARCHAR(64) PRIMARY KEY,
    stars INT,
    date DATE,
    text VARCHAR(2048),
    id_user VARCHAR(64),
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_user) REFERENCES "user" (id_user),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE deliver_options (
    id_deliver_opt VARCHAR(64) PRIMARY KEY,
    delivery_price INT,
    min_order INT, -- minimum order in cent es. €5.95 -> 595
    collection BOOLEAN, -- possibility to ritire the order phisically
    delivery_fee INT, -- fee expressed in x*100 es. 6.27% -> 627
    evereat_fee INT, -- fee expressed in x*100 es. 6.27% -> 627
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE business_hours (
    id_business_hours VARCHAR(64) PRIMARY KEY,
    day VARCHAR(32),
    open_hour TIME,
    close_hour TIME,
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE menu (
    id_menu VARCHAR(64) PRIMARY KEY,
    id_restaurant VARCHAR(64),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE dish (
    id_dish VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64),
    id_menu VARCHAR(64),
    FOREIGN KEY (id_menu) REFERENCES menu (id_menu)
);

CREATE TABLE variant (
    id_variant VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64),
    img VARCHAR(64),
    price INT DEFAULT 599, -- price expressed in cents (e.g. € 12,50 -> 1250)
    id_dish VARCHAR(64),
    FOREIGN KEY (id_dish) REFERENCES dish (id_dish)
);

CREATE TABLE extra (
    id_extra VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64),
    id_dish VARCHAR(64),
    FOREIGN KEY (id_dish) REFERENCES dish (id_dish)
);

CREATE TABLE order_state (
    id_state VARCHAR(64) PRIMARY KEY,
    state VARCHAR(256)
);

CREATE TABLE payment_method (
    id_payment_method VARCHAR(64) PRIMARY KEY,
    payment_method VARCHAR(256)
);

CREATE TABLE "order" (
    id_order VARCHAR(64) PRIMARY KEY,
    date DATE,
    hour TIME,
    paid BOOLEAN,
    id_user VARCHAR(64),
    id_restaurant VARCHAR(64),
    id_rider VARCHAR(64),
    id_state VARCHAR(64),
    id_payment_method VARCHAR(64),
    FOREIGN KEY (id_user) REFERENCES "user" (id_user),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant),
    FOREIGN KEY (id_rider) REFERENCES rider (id_rider),
    FOREIGN KEY (id_state) REFERENCES order_state (id_state),
    FOREIGN KEY (id_payment_method) REFERENCES payment_method (id_payment_method)
);

CREATE TABLE order_variant (
    id_order VARCHAR(64),
    id_variant VARCHAR(64),
    FOREIGN KEY (id_order) REFERENCES "order" (id_order),
    FOREIGN KEY (id_variant) REFERENCES variant (id_variant)
);

CREATE TABLE restaurant_photo (
    id_foto VARCHAR(64) PRIMARY KEY,
    type VARCHAR(64), -- inside/outiside of the restaurant
    path VARCHAR(256),
    id_restaurant VARCHAR(64),
    id_variant VARCHAR(64),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant),
    FOREIGN KEY (id_variant) REFERENCES variant (id_variant)
);

CREATE TABLE discount (
    id_discount VARCHAR(64) PRIMARY KEY,
    discount INT, -- entity of the discount in percentage (eg. 17% -> 17)
    start_date DATE,
    end_date DATE,
    with_code BOOLEAN DEFAULT false, -- boolean to check if the discount can be used only with a code or no
    code VARCHAR(64) DEFAULT NULL, -- if the previous column is true this mustn't be NULL
    max_users INT DEFAULT 0, -- set how many users can use this discount, for now only if there is a code too
    id_restaurant VARCHAR(64),
    id_dish VARCHAR(64),
    FOREIGN KEY (id_dish) REFERENCES dish (id_dish),
    FOREIGN KEY (id_restaurant) REFERENCES restaurant (id_restaurant)
);

CREATE TABLE gift (
    id_gift VARCHAR(64) PRIMARY KEY,
    id_discount VARCHAR(64),
    FOREIGN KEY (id_discount) REFERENCES discount (id_discount)
);

CREATE TABLE gift_variant (
    id_gift VARCHAR(64),
    id_variant VARCHAR(64),
    FOREIGN KEY (id_gift) REFERENCES gift (id_gift),
    FOREIGN KEY (id_variant) REFERENCES variant (id_variant)
);