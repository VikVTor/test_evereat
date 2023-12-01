// const mysql = require('mysql2');

// const dbOptions = {
//     connectionLimit : 100,
//     host: "localhost",
//     user: "node",
//     password : "node",
//     database : "kebab_project",
//     multipleStatements: true
// };

// const dbPool = mysql.createPool(dbOptions);

// module.exports = dbPool;

const { SUPABASE_HOST, SUPABASE_KEY } = require('./constants');

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(SUPABASE_HOST, SUPABASE_KEY);

module.exports = {supabase};