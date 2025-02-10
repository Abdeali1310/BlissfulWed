const express = require("express");
const { getServiceByType } = require("../controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get("/:serviceType",getServiceByType);
module.exports = serviceRouter;
