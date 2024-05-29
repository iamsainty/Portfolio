const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

connectToMongo();

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.json({ Success: "Backend is working perfectly" });
});
app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
