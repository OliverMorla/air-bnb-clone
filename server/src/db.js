const mysql = require('mysql2')
const dotenv = require('dotenv').config()

function Database() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
    }).on('error', (err) => {
        console.error(err);
        throw err;
    })
    return connection;
}

const db = Database();
module.exports = db;

