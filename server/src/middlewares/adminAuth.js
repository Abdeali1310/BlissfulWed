const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.signedCookies["admin_auth"];

    if (!token) {
        return res.status(403).json({ msg: "Admin not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        if (decoded.id) {
            req.adminId = decoded.id;
            return next();
        } else {
            return res.status(403).json({ msg: "Invalid token" });
        }
    } catch (error) {
        return res.status(403).json({ msg: "Admin not logged in" });
    }
};

module.exports = { isLoggedIn }