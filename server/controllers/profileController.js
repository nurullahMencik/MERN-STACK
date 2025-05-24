const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

// Parola güncelleme
const updatePassword = async (req, res) => {
  const { token } = req.headers;
  const { currentPassword, newPassword } = req.body;

  try {
    if (!token) return res.status(401).json({ message: "Geçersiz token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mevcut parola hatalı" });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Parola başarıyla güncellendi" });
  } catch (error) {
    res.status(500).json({ message: "Parola güncelleme başarısız", error: error.message });
  }
};

// Hesap silme
const deleteAccount = async (req, res) => {
  const { token } = req.headers;

  try {
    if (!token) return res.status(401).json({ message: "Geçersiz token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByIdAndDelete(decoded.id);

    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    res.status(200).json({ message: "Hesap başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Hesap silinemedi", error: error.message });
  }
};

module.exports = {
  updatePassword,
  deleteAccount,
};
