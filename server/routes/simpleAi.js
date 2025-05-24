const express = require("express");
const router = express.Router();
const User = require("../models/authModel");
const Course = require("../models/courseModel");

const ALL_CATEGORIES = ["Frontend", "Backend", "Full Stack", "Mobil Geliştirme", "Veri Bilimi"];

// Kullanıcı girişi yapılmamışsa öneri endpoint'i
router.get('/simple-ai', async (req, res) => {
  try {
    const popularCourses = await Course.aggregate([
      { $sort: { students: -1, createdAt: -1 } },
      { $limit: 10 }
    ]);
    return res.json(popularCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı girişi yapılmışsa öneri endpoint'i
router.get('/simple-ai/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Kullanıcıyı bul ve satın alınan kursları populate et
    const user = await User.findOne({ username }).populate('myCourses');
    if (!user) {
      // Kullanıcı bulunamazsa popüler kursları öner
      const popularCourses = await Course.aggregate([
        { $sort: { students: -1, createdAt: -1 } },
        { $limit: 10 }
      ]);
      return res.json(popularCourses);
    }

    // Kullanıcının satın aldığı kursların kategorilerini ve frekanslarını hesapla
    const categoryCounts = {};
    user.myCourses.forEach(course => {
      categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1;
    });

    // Kategorileri frekanslarına göre sırala (en çok alınan önce)
    const sortedCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(item => item[0]);

    // Kullanıcının sahip olduğu kursların _id'leri
    const ownedCourseIds = user.myCourses.map(c => c._id);

    // Önerileri toplayacağımız dizi
    let recommendations = [];

    // 1. Öncelikle en çok alınan kategoriden tüm kursları öner (sahip olmadıkları)
    for (const category of sortedCategories) {
      const categoryCourses = await Course.find({
        category,
        _id: { $nin: ownedCourseIds }
      }).sort({ createdAt: -1 });

      recommendations.push(...categoryCourses);
    }

    // 2. Eğer hala yeterli öneri yoksa, diğer kategorilerden rastgele kurslar ekle
    if (recommendations.length < 10) {
      const remainingCategories = ALL_CATEGORIES.filter(cat => !sortedCategories.includes(cat));
      const randomCourses = await Course.aggregate([
        { 
          $match: { 
            category: { $in: remainingCategories },
            _id: { $nin: ownedCourseIds }
          } 
        },
        { $sample: { size: 10 - recommendations.length } }
      ]);
      recommendations.push(...randomCourses);
    }

    // 3. Eğer hala yeterli öneri yoksa, tüm kategorilerden rastgele kurslar ekle
    if (recommendations.length < 10) {
      const allCourses = await Course.aggregate([
        { $match: { _id: { $nin: ownedCourseIds } } },
        { $sample: { size: 10 - recommendations.length } }
      ]);
      recommendations.push(...allCourses);
    }

    // 4. Son olarak, benzersiz kurslar sağla ve limit uygula
    const uniqueRecommendations = recommendations.reduce((acc, current) => {
      if (!acc.some(item => item._id.equals(current._id))) {
        acc.push(current);
      }
      return acc;
    }, []).slice(0, 10); // En fazla 10 öneri

    res.json(uniqueRecommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;