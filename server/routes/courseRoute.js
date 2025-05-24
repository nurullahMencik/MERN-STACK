const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { createCourse, getCourses, deleteCourse, updateCourse } = require('../controllers/courseController');

// Yeni kurs oluşturma (dosya ve görsel yükleme için multer middleware)
router.post('/createCourse', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), createCourse);

// Tüm kursları listeleme
router.get('/getCourses', getCourses);

// Kurs silme (admin yetkisi ile)
router.delete('/deleteCourse/:id', deleteCourse);

// Kurs güncelleme
router.put('/updateCourse/:id', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), updateCourse);

module.exports = router;
