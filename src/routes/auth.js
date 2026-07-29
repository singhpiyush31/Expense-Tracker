const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

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

authRouter.post("/login", async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(passwordValid) {
            res.status(200).json({ message: "Login Successfully! "});
        }
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error"});
    }
});

module.exports = authRouter