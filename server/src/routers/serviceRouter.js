const express = require("express");
const { getServiceByType, getServiceById } = require("../controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get("/:serviceType",getServiceByType);
serviceRouter.get("/:serviceType/:serviceId",getServiceById);
serviceRouter.get("/id/:serviceId",getServiceById)
module.exports = serviceRouter;
