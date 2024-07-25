const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db');
const cors = require('cors');

dotenv.config();

connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));
app.use('/', (req, res) => {
  res.json({ Success: "Backend is working perfectly" });
});


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
