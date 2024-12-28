require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes.js');
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);


app.listen(5000, () => {
    console.log('Server running on port 5000');
});