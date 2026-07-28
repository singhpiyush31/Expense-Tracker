const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { model } = require('mongoose');

const authRouter = express.Router();

authRouter.post("/register", async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: passwordHash,
        });
        await user.save();
        res.send("User Added Successfully!");
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
});

module.exports = authRouter