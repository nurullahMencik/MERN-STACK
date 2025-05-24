const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController.js");

// Kurs satın alma endpointi
router.post("/", purchaseController.purchaseCourses);

module.exports = router;
