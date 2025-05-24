const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const Course = require("../models/courseModel");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";



const getCoursesByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    const courses = await Course.find({ user: username });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "Kullanıcının kursu bulunamadı" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};


// Kullanıcının satın aldığı kursları getir
const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("myCourses");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(user.myCourses);
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

// Kullanıcının oluşturduğu kursları getir
  const getCreatedCourses = async (req, res) => {
  try {
    const username = req.user.username; // JWT'den gelen kullanıcı adı

    const courses = await Course.find({ user: username }); // user artık username

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'Kurslar alınamadı', error: error.message });
  }
};

  const getCourseById = async (req, res) => {
   try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Kurs bulunamadı.' });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


// Kayıt olma
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Parola en az 6 haneli olmalı" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Geçersiz email adresi" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign(
  { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin },
  JWT_SECRET,
  { expiresIn: "1h" }
);

    res.status(201).json({
      status: "OK",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Giriş yapma
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Böyle bir kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Parola hatalı" });
    }

    const token = jwt.sign(
  { id: user._id, username: user.username, isAdmin: user.isAdmin },
  JWT_SECRET,
  { expiresIn: "1h" }
);

    res.status(200).json({
      status: "OK",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Email doğrulama
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
// Silme işlemi
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const username = req.user.username;

    // Sadece kursun sahibi silebilir
    const course = await Course.findOne({ _id: courseId, user: username });
    if (!course) {
      return res.status(404).json({ message: "Kurs bulunamadı veya yetkisiz işlem" });
    }

    await Course.deleteOne({ _id: courseId });
    res.status(200).json({ message: "Kurs başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Silme işlemi başarısız", error: error.message });
  }
};

// Güncelleme işlemi
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const username = req.user.username;
    const updateData = req.body;

    // Sadece sahibi güncelleyebilir
    const course = await Course.findOne({ _id: courseId, user: username });
    if (!course) {
      return res.status(404).json({ message: "Kurs bulunamadı veya yetkisiz işlem" });
    }

    // Güncelle
    Object.assign(course, updateData);
    await course.save();

    res.status(200).json({ message: "Kurs başarıyla güncellendi", course });
  } catch (error) {
    res.status(500).json({ message: "Güncelleme işlemi başarısız", error: error.message });
  }
};

module.exports = {
  register,
  login,
  getMyCourses,
  getCreatedCourses,
  deleteCourse,
  updateCourse,
  getCourseById,
  getCoursesByUsername,
};
