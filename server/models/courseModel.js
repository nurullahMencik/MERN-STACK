const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  user: { type: String, required: true }, // Kullanıcı adı, kursu paylaşan kullanıcı
  fileUrl: { type: String, required: true }, // Dosya URL'si
  imageUrl: { type: String }, // Fotoğraf URL'si (isteğe bağlı)
  createdAt: { type: Date, default: Date.now } // Kurs oluşturulma tarihi
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
