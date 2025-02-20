const express = require("express");
const { createInvoice, getInvoice } = require("../controllers/invoiceController");
const { isLoggedIn } = require("../middlewares/userAuth");

const invoiceRouter = express.Router();

invoiceRouter.post("/create",isLoggedIn, createInvoice);
invoiceRouter.get("/get-invoice",isLoggedIn, getInvoice);
module.exports = invoiceRouter;
