const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ msg: "User not logged in" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("Received token:", token); // ✅ Debugging log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach user ID to request
        return next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
};

module.exports = { isLoggedIn };
