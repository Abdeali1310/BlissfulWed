const jwt = require('jsonwebtoken');
const User = require('../models/User')

const isLoggedIn = (req, res, next) => {
    const token = req.signedCookies["auth_token"];

    if (!token) {
        return res.status(403).json({ msg: "User not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.userId = decoded.id;
            return next();
        } else {
            return res.status(403).json({ msg: "Invalid token" });
        }
    } catch (error) {
        return res.status(403).json({ msg: "User not logged in" });
    }
};

module.exports = { isLoggedIn }