const { Cashfree } = require("cashfree-pg");
require("dotenv").config();

// Initialize Payment Gateway
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Use PRODUCTION for live environment

module.exports = { Cashfree }