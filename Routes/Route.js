const express = require("express");
const router = express.Router();
const fs = require("fs");
const accountRoutes = require("./account.js");
const priceRoutes = require("./pricing.js");

router.use(accountRoutes);
router.use(priceRoutes);
module.exports = router;
