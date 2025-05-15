const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');


// Kurs güncelle
router.put('/courses/:id', async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, price },
      { new: true }
    );
    
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Kurs bulunamadı' });
    }
    
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: 'Güncelleme başarısız' });
  }
});



module.exports = router;