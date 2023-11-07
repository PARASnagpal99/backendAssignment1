const express = require('express');
const app = express();
const db = require('./db/db');
const bodyParser = require('body-parser');
require('dotenv').config();
db();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes 
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);


const PORT = 3000 || process.env.PORT ;
app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})