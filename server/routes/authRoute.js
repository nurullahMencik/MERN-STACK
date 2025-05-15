const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/my-courses', authController.getMyCourses); // Eksik olan controller eklendi

module.exports = router;
