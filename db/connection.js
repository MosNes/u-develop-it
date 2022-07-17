const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MYSQL UN
        user: 'root',
        //your MYSQL PW
        password: process.env.DBPW,
        database: 'election'
    });

module.exports = db;