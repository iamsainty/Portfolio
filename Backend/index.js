const connectToMongo= require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 5002

app.use(express.json()) // Middleware for parsing JSON bodies

app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})