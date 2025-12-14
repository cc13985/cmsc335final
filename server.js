// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// Express app setup
const app = express();
const port = process.env.PORT || 5001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection with Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
const coffeeRoutes = require('./routes/coffee');
app.use('/', coffeeRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running and can be accessed at http://localhost:${port}`);
});