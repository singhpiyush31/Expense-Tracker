const jwt = require('jsonwebtoken');

const User = require('../models/user');

const userAuth = async (req,res,next) => {
    try {
               
        const { jwtToken } = req.cookies;
        
        if(!jwtToken) {
            return res.status(401).json({ message: "Please login again" });
        }

        const obj = await jwt.verify(jwtToken, process.env.JWT_SECRET);        
        
        const { id } = obj;

        const user = await User.findById(id).select("name email _id");

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized User", error: err.message });
    }
};

module.exports = userAuth;