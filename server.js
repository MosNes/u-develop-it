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

//get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get a single candidate
app.get('/api/candidates/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a single candidate
app.delete('/api/candidates/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
       } else if (!result.affectedRows) {
        res.json({
            message: 'Candidate not found'
        })
       } else {
        res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
        });
        }
    });
});

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//default catch-all response for any other request (not Found)
app.use((req, res) => {
    res.status(404).end();
});

//------FUNCTIONS----------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});