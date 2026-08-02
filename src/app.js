const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const authRouter = require('./routes/auth');
const expenseRouter = require('./routes/expense');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/expense", expenseRouter);

const port = process.env.PORT || 3000;

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(port , () => {
        console.log(`Server is listening successfully on port ${ port }`);
    });
}).catch((err) => {
    console.error("Database not connected!");
});