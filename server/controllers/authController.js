const AuthSchema = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/authModel");
const Course = require("../models/courseModel");

// Ortak JWT_SECRET kullanımı
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY"; // Fallback secret

// Kullanıcı kurslarını getirme
const getMyCourses = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Yetkisiz erişim" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).populate("myCourses");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(user.myCourses);
  } catch (error) {
    console.error("Kurslar alınamadı:", error);
    res.status(500).json({
      message: "Sunucu hatası",
      error: error.message, // Hata detayını göster
    });
  }
};

// Kayıt olma
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await AuthSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Parola en az 6 haneli olmalı" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Yanlış email tipi" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await AuthSchema.create({
      username,
      email,
      password: passwordHash,
    });

    // Aynı JWT_SECRET kullanılıyor
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      status: "OK",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin, // Eğer isAdmin alanı varsa
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

    const user = await AuthSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Böyle bir kullanıcı bulunmamaktadır" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(400).json({ message: "Parola hatalı" });
    }

    // Aynı JWT_SECRET kullanılıyor
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      status: "OK",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, // Admin bilgisini dahil et
      },
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Email doğrulama fonksiyonu
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
  register,
  login,
  getMyCourses,
};
