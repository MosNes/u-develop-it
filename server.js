//use nodemon --exec npm start in development

//-----DEPENDENCIES AND GLOBAL VARIABLES-----------------------------------------
const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const PORT = process.env.PORT || 3001;
const db = require('./db/connection')
const app = express();
const apiRoutes = require('./routes/apiRoutes')

//-----REQUIRED MIDDLEWARE-------------------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//use apiRoutes
app.use('/api', apiRoutes);

//------ROUTES--------------------------------------------------------------------

//default catch-all response for any other request (not Found)
app.use((req, res) => {
    res.status(404).end();
});

//------INITIALIZATION----------------------------------------------------------------

//start server after a DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});