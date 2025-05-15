const Course = require('../models/courseModel');

const createCourse = async (req, res) => {
  try {
      const { title, description, category, user,price } = req.body; 

      // Eğer kullanıcı adı yoksa, hata döndürüyoruz
      if (!user) {
          return res.status(400).json({ message: 'Kullanıcı bilgisi eksik!' });
      }

      const file = req.files?.file;
      const image = req.files?.image;

      if (!file || !image) {
          return res.status(400).json({ message: 'Dosya ve fotoğraf yüklenmeli' });
      }

      const fileUrl = `/uploads/${file[0].filename}`;
      const imageUrl = `/uploads/${image[0].filename}`;

      const newCourse = new Course({
          title,
          price,
          description,
          category,
          user,  
          fileUrl,
          imageUrl,
      });

      await newCourse.save();
      res.status(201).json({ message: 'Kurs başarıyla oluşturuldu', course: newCourse });
  } catch (error) {
      console.error('Kurs oluşturulurken hata:', error);
      res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('user', 'username');
    res.status(200).json({ courses });    // Kursları döndür
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const deleteCourse =  async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Kurs bulunamadı' });
    }
    
    res.json({ message: 'Kurs silindi', id: req.params.id });
  } catch (err) {
    res.status(500).send('Silme hatası');
  }
}
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Kurs bulunamadı' });
    }

    // Yeni dosyalar varsa güncelle
    const file = req.files?.file;
    const image = req.files?.image;

    if (file && file[0]) {
      course.fileUrl = `/uploads/${file[0].filename}`;
    }

    if (image && image[0]) {
      course.imageUrl = `/uploads/${image[0].filename}`;
    }

    // Diğer alanları güncelle
    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (price) course.price = price;

    await course.save();

    res.status(200).json({ message: 'Kurs başarıyla güncellendi', course });
  } catch (error) {
    console.error('Güncelleme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

module.exports = { createCourse, getCourses,deleteCourse,updateCourse };
