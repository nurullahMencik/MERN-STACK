// controllers/purchaseController.js
const User = require("../models/authModel.js");

const purchaseCourses = async (req, res) => {
  const { userId, courses } = req.body; // courses = [courseId1, courseId2...]

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    // Zaten sahip olunan kursları tekrar eklememek için filtreliyoz
    const newCourses = courses.filter(
      (courseId) => !user.myCourses.includes(courseId)
    );

    user.myCourses.push(...newCourses);
    await user.save();

    res.status(200).json({ message: "Kurslar satın alındı", myCourses: user.myCourses });
  } catch (error) {
    console.error("Kurs satın alma hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { purchaseCourses };
