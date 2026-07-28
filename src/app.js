const express = require('express');
require('dotenv').config();

const connectDB = require('./config/database');

const app = express();

const port = process.env.PORT || 3000;

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(port , () => {
        console.log(`Server is listening successfully on port ${ port }`);
    });
}).catch((err) => {
    console.error("Database not connected!");
});