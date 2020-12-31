const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv/config');

const postRoute = require('./routes/posts');

const app = express();

// Middleware
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());
app.use('/posts', postRoute);

// ROUTES

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect to DB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to DB');
});

// How to we listening to the server
app.listen(3000, () => {
  console.log('Successfully running');
});
