const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/authModel");
const verifyToken = require("../middleware/verifyToken");

// Kullanıcı kayıt ve giriş işlemleri
router.post('/register', authController.register);
router.post('/login', authController.login);

// Kullanıcıya ait kursları getirme (satın alınan ve oluşturulan)
router.get('/my-courses', verifyToken, authController.getMyCourses);
router.get('/created-courses', verifyToken, authController.getCreatedCourses);

// Kurs güncelleme, silme ve detay getirme (yetkilendirme ile)
router.delete('/courses/:id', verifyToken, authController.deleteCourse);
router.put('/courses/:id', verifyToken, authController.updateCourse);
router.get('/courses/:id', verifyToken, authController.getCourseById);

router.get("/user/:username", authController.getCoursesByUsername);

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username _id'); // Sadece username ve _id al
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası!' });
  }
});



module.exports = router;
