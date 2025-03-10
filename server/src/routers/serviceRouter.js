const express = require("express");
const { getServiceByType, getServiceById, getAllServices } = require("../controllers/serviceController");
const serviceRouter = express.Router();

serviceRouter.get("/:serviceType",getServiceByType);
serviceRouter.get("/:serviceType/:serviceId",getServiceById);
serviceRouter.get("/id/:serviceId",getServiceById)
serviceRouter.get("/",getAllServices)
module.exports = serviceRouter;
