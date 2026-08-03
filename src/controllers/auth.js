const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid format. Please check your email." })
        }

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Enter name, email and password"});
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: passwordHash,
        });
        await user.save();
        res.status(200).json({ message: "User Added Successfully!", user: user });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
}

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter email and password"});
        }
        const user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(!passwordValid) {
            return res.status(404).json({ message: "Invalid Credential" });
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("jwtToken", token, { maxAge: 7*24*60*60*1000 });
        return res.status(200).json({ message: "Login Successfully! "});
    } catch (err) {
        res.status(500).json({ error: err.message, message: "User not found!" });
    }
};

exports.logout = async (req,res) => {
    try {
        res.cookie("jwtToken", "", { maxAge: 0});
        return res.status(200).json({ message: "Logout Successfully! "});
        
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error"});
    }
};
