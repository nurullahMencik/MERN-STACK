const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

const { createCourse, getCourses,deleteCourse,updateCourse } = require('../controllers/courseController');


// Kurs ekleme (authenticate middleware'ı ekleyin)
router.post('/createCourse', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), createCourse);

// Kurs listeleme (GET)
router.get('/getCourses', getCourses);

// Kurs sil
router.delete('/deleteCourse/:id', deleteCourse);

// Kurs güncelleme kullanmadım
router.put('/updateCourse/:id', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), updateCourse);
module.exports = router;
