const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController.js");

router.post("/", purchaseController.purchaseCourses);

module.exports = router;