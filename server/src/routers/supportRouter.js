const express = require("express");
const supportRouter = express.Router();
const { submitRequest, getAllRequests, resolveRequest } = require("../controllers/supportController");

// Routes
supportRouter.post("/submit", submitRequest);  // 📌 User submits a query/refund request
supportRouter.get("/", getAllRequests);        // 📌 Admin gets all requests
supportRouter.put("/resolve/:id", resolveRequest);  // 📌 Admin marks request as resolved

module.exports = supportRouter;
