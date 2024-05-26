const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require("body-parser");

connectToMongo();

const app = express();
const port = 5002;

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Add the cors middleware to allow all origins
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
