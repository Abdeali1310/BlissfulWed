const express = require("express");
const { searchServices } = require("../controllers/searchController");
const searchRouter = express.Router();

searchRouter.get("/", searchServices);

module.exports = searchRouter;
