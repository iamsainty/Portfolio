const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db');
const cors = require('cors');
const path = require('path'); // Import path module

dotenv.config();

connectToMongo();

const app = express();

// CORS configuration
app.use(cors());

app.use(express.json());
app.use(express.json({ limit: '10mb' })); // Increase this limit if needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded payloads

// Serve static files
app.use('/media', express.static(path.join(__dirname, './media')));

// Routes
app.use('/firebaseauth', require('./routes/firebaseAuth'));
app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));
app.use('/comment', require(('./routes/comment')));
app.use('/', (req, res) => {
  res.json({ Success: "Backend is working perfectly" });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
