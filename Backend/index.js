const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./config/db');
const cors = require('cors');
const path = require('path'); // Import path module
// const { connectToSupabase } = require('./config/supabase-db');

dotenv.config();

connectToMongo();
// connectToSupabase();

const app = express();


// CORS configuration
app.use(cors());

app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_API_TOKEN));
app.use(express.json());
app.use(express.json({ limit: '10mb' })); // Increase this limit if needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded payloads

// Serve static files
app.use('/media', express.static(path.join(__dirname, './media')));

// Routes
app.use('/user-auth', require('./routes/userAuth'));
app.use('/auth', require('./routes/auth'));
app.use('/blog', require('./routes/blog'));
app.use('/comment', require(('./routes/comment')));
app.use('/user', require('./routes/user'));
app.use('/blog-activity', require('./routes/blogActivity'));
app.use('/', (req, res) => {
  res.json({ Success: "Backend is working perfectly" });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
