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

// Kullanıcı silme
router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    res.status(200).json({ message: 'Kullanıcı silindi.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası!' });
  }
});
// PUT /api/auth/:id/admin - Kullanıcıyı admin yap
router.put('/:id/admin', async (req, res) => {
  try {
    const { isAdmin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    res.status(200).json({ message: 'Admin durumu güncellendi.', user });
  } catch (error) {
    console.error('Admin yapma hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username _id'); // Sadece username ve _id al
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası!' });
  }
});



module.exports = router;
