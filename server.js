//-----DEPENDENCIES AND GLOBAL VARIABLES-----------------------------------------

const express = require('express');
const PORT = process.env.PORT || 3001;


const app = express();

//-----REQUIRED MIDDLEWARE-------------------------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//------ROUTES--------------------------------------------------------------------

//default response for any other request (not Found)
app.use((req, res) => {
    res.status(404).end();
});

//------FUNCTIONS----------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});