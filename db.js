'use strict';

const { dbUser, dbPass, dbName } = require('./config.json');
const sql = require('mysql2/promise');

const pool = sql.createPool({
    host: 'localhost',
    user: dbUser,
    password: dbPass,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.executeQuery = async(query) => {
    let connection = await pool.getConnection();
    let [results, metadata] = await connection.execute(query);

    return results;
};
