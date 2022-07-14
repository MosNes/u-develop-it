//-----DEPENDENCIES AND GLOBAL VARIABLES-----------------------------------------

const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const secrets = require('./secrets.json');


const app = express();

//-----REQUIRED MIDDLEWARE-------------------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MYSQL UN
        user: 'root',
        //your MYSQL PW
        password: secrets.db_pw,
        database: 'election'
    },
    console.log('Connected to the election database.')
);

//------ROUTES--------------------------------------------------------------------

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

//default catch-all response for any other request (not Found)
app.use((req, res) => {
    res.status(404).end();
});

//------FUNCTIONS----------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});