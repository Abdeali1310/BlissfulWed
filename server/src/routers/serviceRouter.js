const express = require("express");
const { getServiceByType, getServiceById, getAllServices, getTopBookedServices, getMostBookedCategory, getAverageRating, createNewService } = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/adminAuth");
const serviceRouter = express.Router();

serviceRouter.get("/:serviceType",getServiceByType);
serviceRouter.get("/:serviceType/:serviceId",getServiceById);
serviceRouter.get("/id/:serviceId",getServiceById)
serviceRouter.get("/",getAllServices)
serviceRouter.get("/admin/get/top-booked-services", getTopBookedServices);
serviceRouter.get("/admin/get/most-booked-category", getMostBookedCategory);
serviceRouter.get("/admin/get/average-rating", getAverageRating);
serviceRouter.post("/new",createNewService)
module.exports = serviceRouter;
