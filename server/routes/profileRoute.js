const express = require("express");
const router = express.Router();
const { updatePassword, deleteAccount } = require("../controllers/profileController");

// Sadece iki endpoint
router.put("/updatePassword", updatePassword);
router.delete("/deleteAccount", deleteAccount);

module.exports = router;
